import { ISODateString, UUID } from "../cammon";
import type { Categoria } from "./categoria";

export interface RegraCategoria {
  id: UUID;
  usuarioId: UUID;

  palavraChave: string;
  categoriaId: UUID;
  prioridade: number;

  createdAt: ISODateString;

  categoria?: Categoria;
}
