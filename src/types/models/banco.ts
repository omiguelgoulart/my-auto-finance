import type { UUID, ISODateString } from "../cammon";

export interface Banco {
  id: UUID;
  nome: string;
  codigo?: string | null;
  createdAt: ISODateString;
}
