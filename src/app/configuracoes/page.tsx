"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, Calendar, Palette, MessageCircle, FileUp, Tags, Sparkles, LogOut } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { SettingsItem } from "@/components/configuracoes/ConfiguracoesItens";
import { SettingsSection } from "@/components/configuracoes/ConfiguracaoSection";

type Tema = "SYSTEM" | "LIGHT" | "DARK";

type Preferencias = {
  moeda: string;
  inicioMes: number;
  tema: Tema;
  idioma: string;
  fusoHorario: string;
};

function labelTema(tema: Tema) {
  if (tema === "SYSTEM") return "Sistema";
  if (tema === "LIGHT") return "Claro";
  return "Escuro";
}

export default function ConfiguracoesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [preferencias, setPreferencias] = useState<Preferencias | null>(null);

  async function patchPreferencias(payload: Partial<Preferencias>) {
    const token = localStorage.getItem("token");
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!token) {
      router.push("/login");
      return null;
    }

    if (!baseUrl) {
      toast.error("NEXT_PUBLIC_API_URL não configurada.");
      return null;
    }

    const response = await fetch(`${baseUrl}/preferencias`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      throw new Error(err?.erro || err?.error || "Erro ao atualizar preferências");
    }

    return (await response.json()) as Preferencias;
  }

  useEffect(() => {
    async function fetchPreferencias() {
      const token = localStorage.getItem("token");
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!token) {
        router.push("/login");
        return;
      }

      if (!baseUrl) {
        toast.error("NEXT_PUBLIC_API_URL não configurada.");
        return;
      }

      const response = await fetch(`${baseUrl}/preferencia`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.erro || err?.error || "Erro ao buscar preferências");
      }

      return (await response.json()) as Preferencias;
    }

    fetchPreferencias()
      .then((data) => setPreferencias(data ?? null))
      .catch((e: unknown) => {
        console.error(e);
        toast.error("Erro ao carregar preferências.");
      })
      .finally(() => setLoading(false));
  }, [ router ]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  async function handleTrocarMoeda() {
    if (!preferencias) return;

    const nova = window.prompt("Digite a moeda (ex: BRL, USD, EUR):", preferencias.moeda);
    if (!nova) return;

    try {
      const updated = await patchPreferencias({ moeda: nova.toUpperCase() });
      if (updated) setPreferencias(updated);
      toast.success("Moeda atualizada!");
    } catch (e) {
      console.error(e);
      toast.error("Erro ao atualizar moeda.");
    }
  }

  async function handleTrocarInicioMes() {
    if (!preferencias) return;

    const valor = window.prompt("Digite o dia de início do mês (1 a 28):", String(preferencias.inicioMes));
    if (!valor) return;

    const dia = Number(valor);
    if (!Number.isFinite(dia) || dia < 1 || dia > 28) {
      toast.error("Dia inválido. Use um número entre 1 e 28.");
      return;
    }

    try {
      const updated = await patchPreferencias({ inicioMes: dia });
      if (updated) setPreferencias(updated);
      toast.success("Início do mês atualizado!");
    } catch (e) {
      console.error(e);
      toast.error("Erro ao atualizar início do mês.");
    }
  }

  async function handleTrocarTema() {
    if (!preferencias) return;

    const novo = window.prompt("Digite o tema: SYSTEM, LIGHT ou DARK", preferencias.tema);
    if (!novo) return;

    const tema = novo.toUpperCase();
    if (tema !== "SYSTEM" && tema !== "LIGHT" && tema !== "DARK") {
      toast.error("Tema inválido. Use SYSTEM, LIGHT ou DARK.");
      return;
    }

    try {
      const updated = await patchPreferencias({ tema: tema as Tema });
      if (updated) setPreferencias(updated);
      toast.success("Tema atualizado!");
    } catch (e) {
      console.error(e);
      toast.error("Erro ao atualizar tema.");
    }
  }

  if (loading) {
    return (
      <AppShell>
        <TopBar title="Configuracoes" />
        <div className="p-4 text-sm text-muted-foreground">Carregando...</div>
      </AppShell>
    );
  }

  if (!preferencias) {
    return (
      <AppShell>
        <TopBar title="Configuracoes" />
        <div className="p-4">Não foi possível carregar as preferências.</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <TopBar title="Configuracoes" />
      <div className="space-y-6 p-4">
        <SettingsSection title="Preferencias">
          <SettingsItem
            icon={<DollarSign className="h-5 w-5" />}
            label="Moeda"
            value={preferencias.moeda}
            onClick={handleTrocarMoeda}
          />
          <SettingsItem
            icon={<Calendar className="h-5 w-5" />}
            label="Inicio do mes"
            value={`Dia ${preferencias.inicioMes}`}
            onClick={handleTrocarInicioMes}
          />
          <SettingsItem
            icon={<Palette className="h-5 w-5" />}
            label="Tema"
            value={labelTema(preferencias.tema)}
            onClick={handleTrocarTema}
          />
        </SettingsSection>

        <SettingsSection title="Organizacao">
          <SettingsItem
            icon={<Tags className="h-5 w-5" />}
            label="Categorias"
            onClick={() => router.push("/categorias")}
          />
          <SettingsItem
            icon={<Sparkles className="h-5 w-5" />}
            label="Regras de categorizacao"
            onClick={() => router.push("/regras")}
          />
        </SettingsSection>

        <SettingsSection title="Integracoes">
          <SettingsItem
            icon={<MessageCircle className="h-5 w-5" />}
            label="WhatsApp"
            value="Em breve"
            onClick={() => {}}
          />
          <SettingsItem
            icon={<FileUp className="h-5 w-5" />}
            label="Importar extrato"
            value="Em breve"
            onClick={() => {}}
          />
        </SettingsSection>

        <SettingsSection title="Conta">
          <SettingsItem
            icon={<LogOut className="h-5 w-5" />}
            label="Sair"
            onClick={handleLogout}
            destructive
          />
        </SettingsSection>
      </div>
    </AppShell>
  );
}
