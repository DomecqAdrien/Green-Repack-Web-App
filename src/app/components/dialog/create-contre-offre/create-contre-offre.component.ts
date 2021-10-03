import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrixVente } from 'src/app/model/PrixVente';

@Component({
  selector: 'app-create-contre-offre',
  templateUrl: './create-contre-offre.component.html',
  styleUrls: ['./create-contre-offre.component.scss']
})
export class CreateContreOffreComponent {

 
  form: FormGroup;
  prixVente: PrixVente;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateContreOffreComponent>
  ) {
    this.prixVente = data.prix
    this.form = this.formBuilder.group({
      prix: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close(this.form.value.prix);
  }

  closeDialog(): void{
    this.dialogRef.close();
  }
}
