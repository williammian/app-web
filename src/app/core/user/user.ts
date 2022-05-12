import { Perfil } from "./perfil";

export interface User {
  id: number;
  nome: string;
  email: string;
  perfis: Array<Perfil>;
}
