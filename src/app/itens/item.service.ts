import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ItemFiltro } from "./item-filtro";

const API = environment.ApiUrl;

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

    return this.http
      .get<any>(API + '/itens', { params });
  }

}
