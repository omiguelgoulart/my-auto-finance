"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { CategoriasList } from "@/components/categorias/CategoriaList";
import { NovaCategoriaDrawer } from "@/components/categorias/NovaCategoriaDrawer";
import { AppShell } from "@/components/layout/AppShell";
import { Categoria } from "@/types/models/categoria";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategorias() {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Você precisa estar logado para acessar categorias.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const err = await response.json().catch(() => null);
          throw new Error(err?.erro || "Erro ao carregar categorias");
        }

        const data = (await response.json()) as Categoria[];
        setCategorias(data);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar categorias.");
      } finally {
        setLoading(false);
      }
    }

    fetchCategorias();
  }, []);

  return (
    <AppShell>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background px-4">
        <div className="w-8" />
        <h1 className="text-base font-semibold">Categorias</h1>
        <NovaCategoriaDrawer />
      </header>

      <div className="p-4">
        {loading ? (
          <div className="text-sm text-muted-foreground">Carregando categorias...</div>
        ) : (
          <CategoriasList categorias={categorias} />
        )}
      </div>
    </AppShell>
  );
}