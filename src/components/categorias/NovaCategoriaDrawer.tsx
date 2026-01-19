"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const coresPredefinidas = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E2",
] as const;

type TipoCategoria = "RECEITA" | "DESPESA";

export function NovaCategoriaDrawer() {
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>(coresPredefinidas[0]);
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<TipoCategoria>("DESPESA");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Você precisa estar logado.");
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      toast.error("NEXT_PUBLIC_API_URL não configurada.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/categoria`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: nome.trim(),
          tipo,
          cor: selectedColor,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.erro || "Erro ao criar categoria");
      }

      toast.success("Categoria criada com sucesso!");
      setOpen(false);
      setNome("");
      setTipo("DESPESA");
      setSelectedColor(coresPredefinidas[0]);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar categoria. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="icon-sm" variant="ghost">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Nova categoria</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Nova Categoria</DrawerTitle>
          <DrawerDescription>Crie uma categoria para organizar suas movimentações</DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="px-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                placeholder="Ex: Alimentação"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo</Label>
              <select
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoCategoria)}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="DESPESA">Despesa</option>
                <option value="RECEITA">Receita</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Cor</Label>
              <div className="flex flex-wrap gap-2">
                {coresPredefinidas.map((cor) => (
                  <button
                    key={cor}
                    type="button"
                    onClick={() => setSelectedColor(cor)}
                    className={cn(
                      "h-8 w-8 rounded-full border-2 transition-all",
                      selectedColor === cor ? "border-foreground scale-110" : "border-transparent"
                    )}
                    style={{ backgroundColor: cor }}
                  >
                    <span className="sr-only">Cor {cor}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DrawerFooter className="px-0">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Criando..." : "Criar categoria"}
            </Button>

            <DrawerClose asChild>
              <Button variant="outline" type="button" disabled={isLoading}>
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
