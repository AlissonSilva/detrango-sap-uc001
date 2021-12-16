import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Item } from 'src/app/models/Item';
import { ItemServices } from 'src/app/services/Item.services';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ItemServices]
})
export class HomeComponent implements OnInit {

  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id','tipo', 'descricao','action'];
  dataSource!: Item[];
  router!: Router;
  itemSearch:any = {};


  constructor(
    public dialog: MatDialog,
    public itemServices: ItemServices,
    private snack: MatSnackBar
    ) {
      this.itemServices.getItens().subscribe((data: Item[])=>{
        console.log(data);
        this.dataSource = data;
      })
    }

  ngOnInit(): void {
  }


  snackBar(msg : string): void{
    this.snack.open(msg, 'fechar');
  }

  deletarItem(id: number): void{
    this.itemServices.deletarItem(id).subscribe(()=> {
      this.dataSource = this.dataSource.filter(p => p.id !== id);
      this.snackBar('Item deletado com sucesso');
    });
  }

  editarItem(element : Item):void{
    this.openDialog(element);
  }

  pesquisarItem(){
    if (!this.itemSearch.tipo_pesquisa){
      this.snackBar('Tipo do item é obrigatório');
    }else if(!this.itemSearch.descricao_pesquisa){
      this.snackBar('Descrição é obrigatório');
    }else{
      this.itemServices.pesquisarItem(this.itemSearch).subscribe((data: Item[])=>{
        console.log(data);
        this.dataSource = data;
      });
    }
  }

  limparPesquisa(){
    this.itemServices.getItens().subscribe((data: Item[])=>{
      console.log(data);
      this.dataSource = data;
    });
  }

  openDialog(element: Item | null): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: element === null ?{
        id: null,
        tipo: '',
        descricao: ''
      }: {
        id: element.id,
        tipo: element.tipo,
        descricao: element.descricao
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result !== undefined){
        if(this.dataSource.map(p => p.id).includes(result.id)){
          this.itemServices.editarItem(result).subscribe((data: Item)=>{
            const index = this.dataSource.findIndex(p => p.id == data.id);
            this.dataSource[index] = data;
            this.table.renderRows();
            this.snackBar('Item editado com sucesso');
          });
        }else{
            this.itemServices.cadastrarItem(result).subscribe((data: Item)=>{
              this.dataSource.push(data);
              this.table.renderRows();
              this.snackBar('Item cadastrado com sucesso');
          });
        }
      }else {
        this.snackBar('Campo descrição obrigatório');
      }
    });
  }

}
