import {Component, Inject, OnInit} from '@angular/core';
import {Cliente_T} from "../../../model/cliente-model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-editor',
  templateUrl: './dialog-editor.component.html',
  styleUrls: ['./dialog-editor.component.css']
})
export class DialogEditorComponent implements OnInit {
 element!: Cliente_T;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Cliente_T,
    public dialogRef: MatDialogRef<DialogEditorComponent>,
  ) {}


  ngOnInit(): void {
    if (this.data.id_cliente != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }

}

