import { UUID } from "../cammon";

export interface LoginResponse {
  id: UUID;
  nome: string;
  email: string;
  token: string;
}
