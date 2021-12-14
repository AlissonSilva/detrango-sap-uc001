import { Component, Inject, Injectable, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/Item';
import { ItemServices } from 'src/app/services/Item.services';


@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css'],
  providers: [ItemServices]
})
export class AdicionarComponent implements OnInit {


 item:any = [];

  constructor(private services: ItemServices, private snack: MatSnackBar){}

  ngOnInit(): void { }


  cadastrar(): void{
    this.services.cadastrarItem(this.item).subscribe(result =>{
      console.log(this.item);
      this.snack.open("Dados salvo com sucesso.");
    });

  }

}
