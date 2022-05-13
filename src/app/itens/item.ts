export class Item {
  id: number;
  tipo: number;
  codigo: string;
  descricao: string;
  dataCadastro: Date;
  ativo: boolean;
  abc: string;
  preco: number;

  constructor(init: Item) {
    this.id = init.id;
    this.tipo = init.tipo;
    this.codigo = init.codigo;
    this.descricao = init.descricao;
    this.dataCadastro = parseDate(init.dataCadastro);
    this.ativo = init.ativo;
    this.abc = init.abc;
    this.preco = init.preco;
  }

}

export function parseDate(str: string | Date): Date {
  if (str !== undefined && str !== null) {
    return new Date(str);
  }
  return undefined;
}
