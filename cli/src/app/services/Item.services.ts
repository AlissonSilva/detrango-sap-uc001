import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { Item, ItemResponse} from "../models/Item";
import { CollectionViewer } from "@angular/cdk/collections";

@Injectable()
export class ItemServices{
  apiUrl = 'http://localhost:8080/itens';

  private subjectItem = new BehaviorSubject<Item[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin':'*',
      'Accept':'*/*',
      'Access-Control-Allow-Methods': 'PUT,GET,POST,DELETE',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(private http: HttpClient){}

  connect(collectionViewer: CollectionViewer): Observable<Item[]> {
    return this.subjectItem.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.subjectItem.complete();
      this.loadingSubject.complete();
      this.countSubject.complete();
  }

  getItens(): Observable<Item[]>{
    return this.http.get<Item[]>(this.apiUrl);
  }

  pesquisarItem(element: any):Observable<any>{
    // console.log(element);
    const url = this.apiUrl+'/pesquisar';
    const params = element;
    console.log(url);
    return this.http.get(this.apiUrl+'/pesquisar', {params});
  }


  getItensPage(request: any){
    const params = request;
    return this.http.get(this.apiUrl+'/filterpage',{params});
  }

  loadItensPage(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);

    return this.getItensPage({ page: pageNumber, size: pageSize })
        .pipe(catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe((result: any) => {
            this.subjectItem.next(result.content);
            this.countSubject.next(result.totalElements);
    });
  }

  cadastrarItem(element: Item):Observable<Item>{
    //console.log(element);
    return this.http.post<Item>(this.apiUrl, element, this.httpOptions);
  }


  editarItem(element: Item): Observable<Item>{
    return this.http.put<Item>(`${this.apiUrl}/${element.id}/editar`, element);
  }

  deletarItem(id: number): Observable<any>{
    return this.http.put<Item>(`${this.apiUrl}/${id}/deletar`, id);
  }
}
