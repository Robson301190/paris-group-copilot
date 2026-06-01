export type StatusDecisao = "pendente" | "decidida" | "revisada";

export interface Decisao {
  id: string;
  titulo: string;
  contexto: string;
  status: StatusDecisao;
  data: string;
}
