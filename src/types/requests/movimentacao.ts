import { ISODateString, UUID } from "../cammon";
import type {
  OrigemLancamento,
  TipoMovimentacao,
  TipoRecorrencia,
} from "../enums";

export interface CriarMovimentacaoRequest {
  contaId: UUID;
  categoriaId?: UUID;

  descricao: string;
  valor: number;
  data: ISODateString;

  tipo: TipoMovimentacao;
  origem: OrigemLancamento;

  competencia?: string; // "YYYY-MM"
  observacoes?: string;

  recorrente?: boolean;
  recorrenciaTipo?: TipoRecorrencia;
  recorrenciaIntervalo?: number;
  recorrenciaFim?: ISODateString;

  categoriaAutomatica?: boolean;
  confiancaIA?: number;
  idExterno?: string;
}

export type AtualizarMovimentacaoRequest = Omit<
  Partial<CriarMovimentacaoRequest>,
  "contaId" | "idExterno" | "origem"
>;
