import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  message = 'Are you sure?';
  confirmButtonText = 'Confirmer';
  cancelButtonText = 'Annuler';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmComponent>
  ) {
    if (data){
      this.message = data.message || this.message;
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
