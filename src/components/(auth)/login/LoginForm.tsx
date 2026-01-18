"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import type { LoginResponse } from "@/types/responses/auth";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.erro || "Erro ao fazer login");
      }

      const data = await response.json();

      const loginData = data as LoginResponse;

      localStorage.setItem("token", loginData.token);

      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="senha">Senha</Label>
        <Input
          id="senha"
          type="password"
          placeholder="********"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>

      <div className="text-center">
        <button
          type="button"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          Esqueci minha senha
        </button>
      </div>
    </form>
  );
}
