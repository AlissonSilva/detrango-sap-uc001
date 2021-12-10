import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  descricao: string;
  tipo_item: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {tipo_item: 'Documentos', descricao: 'Hydrogen'},
  {tipo_item: 'Documentos', descricao: 'Helium'},
  {tipo_item: 'Outros', descricao: 'Lithium'},
  {tipo_item: 'Documentos', descricao: 'Beryllium'},
  {tipo_item: 'Outros', descricao: 'Boron'},
  {tipo_item: 'Documentos', descricao: 'Carbon'},
  {tipo_item: 'Outros', descricao: 'Nitrogen'},
  {tipo_item: 'Outros', descricao: 'Oxygen'},
  {tipo_item: 'Documentos', descricao: 'Fluorine'},
  {tipo_item: 'Outros', descricao: 'Neon'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['tipo_item', 'descricao','action'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
