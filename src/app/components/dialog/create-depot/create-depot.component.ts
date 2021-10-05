import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-depot',
  templateUrl: './create-depot.component.html',
  styleUrls: ['./create-depot.component.scss']
})
export class CreateDepotComponent{


  form: FormGroup;
  types: String[] = ['Text', 'Number'];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateDepotComponent>
  ) {
    this.form = this.formBuilder.group({

      libelle: ['', Validators.required],
      adresse: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      capacite: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  closeDialog(): void{
    this.dialogRef.close();
  }

}
