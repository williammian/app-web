import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Item } from "./item";
import { ItemFiltro } from "./item-filtro";
import { map } from 'rxjs/operators';

const API_URL = environment.ApiUrl;
const API_URN = '/itens';

@Injectable({ providedIn: 'root' })
export class ItemService {

  constructor(
    private http: HttpClient) {
  }

  listar(filtro: ItemFiltro) {
    let params = new HttpParams();
    params = params.append('codigoDescricao', filtro.codigoDescricao);
    params = params.append('page', filtro.page.toString());
    params = params.append('size', filtro.size.toString());

    return this.http.get<any>(API_URL + API_URN, { params });
  }

  adicionar(item: Item) {
    return this.http.post<Item>(API_URL + API_URN, item)
    .pipe(
      map(item => {
        item = new Item(item);
        return item;
      })
    );
  }

  atualizar(item: Item) {
    return this.http.put<Item>(API_URL + API_URN + '/' + item.id, item)
    .pipe(
      map(item => {
        item = new Item(item);
        return item;
      })
    );
  }

  excluir(id: number) {
    return this.http.delete(API_URL + API_URN + '/' + id);
  }

  buscar(id: number) {
    return this.http.get<Item>(API_URL + API_URN + '/' + id)
    .pipe(
      map(item => {
        item = new Item(item);
        return item;
      })
    );
  }

}
