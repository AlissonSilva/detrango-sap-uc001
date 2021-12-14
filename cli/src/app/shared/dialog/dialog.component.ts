import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  element!: Item;
  isChange!: boolean;

    constructor(
      @Inject(MAT_DIALOG_DATA)
      public data: Item,
      public dialogRef: MatDialogRef<DialogComponent>,
    ) {}


  ngOnInit(): void {
    if(this.data.id != null){
      this.isChange = true;
    }else{
      this.isChange = false;
    }
  }


  onLimpar(): void{

  }

  onCancelar(): void {
    this.dialogRef.close();
  }


}
