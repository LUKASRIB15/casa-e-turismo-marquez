"use client";

import { Lock, Mail } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const adminFormValidationSchema = z.object({
  email: z.email(),
  password: z.string(),
});

type AdminFormData = z.infer<typeof adminFormValidationSchema>;

export function AdminForm() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<AdminFormData>({
    resolver: zodResolver(adminFormValidationSchema),
  });

  const router = useRouter();

  async function handleAccessAsAdmin(data: AdminFormData) {
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const result = await res.json();

    if (result.ok) {
      router.push("/edit/inicio");
    } else {
      toast.error("Credenciais inválidas!", {
        style: {
          background: "#DC2626", // red-600
          color: "#FFFFFF",
          border: "1px solid #B91C1C", // red-700
        },
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleAccessAsAdmin)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          E-mail
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="pl-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
            {...register("email")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Senha
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="pl-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
            {...register("password")}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-base"
      >
        {isSubmitting ? "Entrando..." : "Acessar Painel"}
      </Button>
    </form>
  );
}
