import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Item } from "../models/Item";

@Injectable()
export class ItemServices{
  apiUrl = 'http://localhost:8080/itens'
  constructor(private http: HttpClient){}

  getItens(): Observable<Item[]>{
    return this.http.get<Item[]>(this.apiUrl);
  }

  cadastrarItem(element: Item):Observable<Item>{
    return this.http.post<Item>(this.apiUrl, element);
  }

  editarItem(element: Item): Observable<Item>{
    return this.http.put<Item>(this.apiUrl, element);
  }

  deletarItem(id: number): Observable<any>{
    return this.http.put<Item>(`${this.apiUrl}/${id}/deletar`, id);
  }
}
