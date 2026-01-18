import { ISODateString, UUID } from "./cammon";
import { PapelUsuario, StatusUsuario } from "./enums";


export interface Usuario {
  id: UUID;
  nome: string;
  email: string;
  telefone?: string | null;
  fotoUrl?: string | null;

  fusoHorario: string;
  moedaPadrao: string;
  idioma: string;

  status: StatusUsuario;
  papel: PapelUsuario;

  emailVerificadoEm?: ISODateString | null;
  ultimoLoginEm?: ISODateString | null;

  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt?: ISODateString | null;
}
