import { UUID } from "../cammon";

export interface CriarRegraCategoriaRequest {
  palavraChave: string;
  categoriaId: UUID;
  prioridade?: number;
}

export interface AtualizarRegraCategoriaRequest {
  palavraChave?: string;
  categoriaId?: UUID;
  prioridade?: number;
}
