import { ISODateString, UUID } from "../cammon";
import type { TipoMovimentacao } from "../enums";

export interface Categoria {
  id: UUID;
  usuarioId: UUID;

  nome: string;
  tipo: TipoMovimentacao;
  cor?: string | null;

  createdAt: ISODateString;
}
