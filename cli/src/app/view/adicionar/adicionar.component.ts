import { Component, Inject, Injectable, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Item } from 'src/app/models/Item';
import { ItemServices } from 'src/app/services/Item.services';


@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css'],
  providers: [ItemServices]
})
export class AdicionarComponent implements OnInit {


 item:any = {};

  constructor(private services: ItemServices, private snack: MatSnackBar){}

  ngOnInit(): void { }


  cadastrar(): void{
    if(!this.item.tipo){
      console.log('Campo tipo de item obrigatório');
      this.snackBar('Campo tipo de item obrigatório');
      return;
    }else if(!this.item.descricao){
      console.log('Campo descrição obrigatório');
      this.snackBar('Campo descrição obrigatório');
      return;
    }else{
      this.services.cadastrarItem(this.item).subscribe((result: Item)=>{
        console.log(result);
        this.snackBar('Item salvo com sucesso');
        this.resetForm();
      });

    }
  }

  snackBar(msg : string): void{
    this.snack.open(msg, 'fechar');
  }

  resetForm(): void{
    this.item.item ;
    this.item.descricao = '';
  }

}
