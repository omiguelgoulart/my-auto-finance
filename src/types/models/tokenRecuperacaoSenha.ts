import { ISODateString, UUID } from "../cammon";


export interface TokenRecuperacaoSenha {
  id: UUID;
  usuarioId: UUID;
  tokenHash: string;
  expiraEm: ISODateString;
  usadoEm?: ISODateString | null;
  createdAt: ISODateString;
}
