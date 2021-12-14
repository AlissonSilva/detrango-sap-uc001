import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Item } from "../models/Item";

@Injectable()
export class ItemServices{
  apiUrl = 'http://localhost:8080/itens'

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient){}

  getItens(): Observable<Item[]>{
    return this.http.get<Item[]>(this.apiUrl);
  }

  cadastrarItem(element: Item):Observable<Item>{
    return this.http.post<Item>(this.apiUrl, element, this.httpOptions);
  }

  editarItem(element: Item): Observable<Item>{
    return this.http.put<Item>(`${this.apiUrl}/${element.id}/editar`, element);
  }

  deletarItem(id: number): Observable<any>{
    return this.http.put<Item>(`${this.apiUrl}/${id}/deletar`, id);
  }
}
