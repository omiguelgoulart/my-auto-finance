import type { UUID, ISODateString } from "../cammon";
import type { TipoConta } from "../enums";
import type { Banco } from "./banco";

export interface Conta {
  id: UUID;
  usuarioId: UUID;
  bancoId: UUID;

  nome: string;
  tipo: TipoConta;
  saldoInicial: number;

  createdAt: ISODateString;

  banco?: Banco;
}
