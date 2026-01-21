export type Tema = "SYSTEM" | "LIGHT" | "DARK";

export interface PreferenciasResponse {
  moeda: string;
  inicioMes: number;
  tema: Tema;
  idioma: string;
  fusoHorario: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PreferenciasUpdatePayload {
  moeda?: string;
  inicioMes?: number;
  tema?: Tema;
  idioma?: string;
  fusoHorario?: string;
}
