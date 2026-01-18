import { UUID } from "../cammon";

export interface LoginResponse {
  id: UUID;
  nome: string;
  email: string;
  token: string;
}

export interface LoginPayload {
  email: string
  senha: string
}