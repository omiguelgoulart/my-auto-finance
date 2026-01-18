import type { ISODateString, UUID } from "../cammon";
import type {
  OrigemLancamento,
  TipoMovimentacao,
  TipoRecorrencia,
} from "../enums";
import type { Categoria } from "./categoria";
import type { Conta } from "./conta";

export interface Movimentacao {
  id: UUID;
  usuarioId: UUID;

  contaId: UUID;
  categoriaId?: UUID | null;

  descricao: string;
  valor: number;
  data: ISODateString;

  recorrente: boolean;
  recorrenciaTipo?: TipoRecorrencia | null;
  recorrenciaIntervalo?: number | null;
  recorrenciaFim?: ISODateString | null;

  competencia?: string | null; // "YYYY-MM"
  observacoes?: string | null;

  tipo: TipoMovimentacao;
  origem: OrigemLancamento;

  categoriaAutomatica: boolean;
  confiancaIA?: number | null; // 0..1
  idExterno?: string | null;

  createdAt: ISODateString;

  conta?: Conta;
  categoria?: Categoria | null;
}
