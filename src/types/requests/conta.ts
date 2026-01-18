import { UUID } from "../cammon";
import type { TipoConta } from "../enums";

export interface CriarContaRequest {
  bancoId: UUID;
  nome: string;
  tipo: TipoConta;
  saldoInicial?: number;
}

export interface AtualizarContaRequest {
  bancoId?: UUID;
  nome?: string;
  tipo?: TipoConta;
  saldoInicial?: number;
}
