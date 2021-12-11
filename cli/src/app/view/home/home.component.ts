import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Item } from 'src/app/models/Item';
import { ItemServices } from 'src/app/services/Item.services';


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


  constructor(
    public dialog: MatDialog,
    public itemServices: ItemServices
    ) {
      this.itemServices.getItens().subscribe((data: Item[])=>{
        console.log(data);
        this.dataSource = data;
      })
    }

  ngOnInit(): void {
  }

  deletarElemento(id: number): void{
    this.itemServices.deletarItem(id).subscribe(()=> {
      this.dataSource = this.dataSource.filter(p => p.id !== id);
    });
  }

  editarElemento(element : Item):void{
    this.openDialog(element);
  }

  openDialog(element: Item | null): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
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
      if(result !== undefined){
        if(this.dataSource.map(p => p.id).includes(result.id)){
          this.itemServices.editarItem(result).subscribe((data: Item)=>{
            const index = this.dataSource.findIndex(p => p.id == data.id);
            this.dataSource[index] = data;
            this.table.renderRows();
          });
        }else{
            this.itemServices.cadastrarItem(result).subscribe((data: Item)=>{
              this.dataSource.push(data);
              this.table.renderRows();
          });
        }
      }
    });
  }

}
