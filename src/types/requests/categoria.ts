import type { TipoMovimentacao } from "../enums";

export interface CriarCategoriaRequest {
  nome: string;
  tipo: TipoMovimentacao;
  cor?: string | null;
}

export interface AtualizarCategoriaRequest {
  nome?: string;
  tipo?: TipoMovimentacao;
  cor?: string | null;
}
