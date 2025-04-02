"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionMethod } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useTransition } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createOrder } from "../actions/create-order";
import { CartContext } from "../contexts/cart";
import { isValidCpf } from "../helpers/cpf";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
  cpf: z
    .string()
    .min(11, { message: "CPF é obrigatório" })
    .trim()
    .refine((cpf) => isValidCpf(cpf), {
      message: "CPF inválido",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function FinishOrderDialog({
  isOpen,
  onOpenChange,
}: FinishOrderDialogProps) {
  const { products } = useContext(CartContext);

  const [isPending, startTransition] = useTransition();

  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const consumptionMethod = searchParams.get(
        "consumptionMethod",
      ) as ConsumptionMethod;

      startTransition(async () => {
        await createOrder({
          customerName: data.name,
          customerCpf: data.cpf,
          consumptionMethod,
          products: products,
          restaurantSlug: slug,
        });

        onOpenChange(false);

        toast.success("Pedido finalizado com sucesso!");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar pedido</DrawerTitle>
          <DrawerDescription>
            Por favor, insira suas informações abaixo para finalizar seu pedido.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Digite seu CPF"
                        format="###.###.###-###"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button
                  type="submit"
                  variant={"destructive"}
                  className="rounded-full"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Finalizar"
                  )}
                </Button>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="w-full rounded-full"
                    disabled={isPending}
                  >
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
