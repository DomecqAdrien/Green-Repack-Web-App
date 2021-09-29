import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categorie } from 'src/app/model/Categorie';
import { Unite } from 'src/app/model/Unite';
import { CreateTechnicienComponent } from '../create-technicien/create-technicien.component';

@Component({
  selector: 'app-create-caracteristique',
  templateUrl: './create-caracteristique.component.html',
  styleUrls: ['./create-caracteristique.component.scss']
})
export class CreateCaracteristiqueComponent {
  
  form: FormGroup;
  categories: Categorie[];
  unites: Unite[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateCaracteristiqueComponent>
  ) {
    this.categories = data.categories;
    console.log(data)
    this.unites = data.unites;
    this.form = this.formBuilder.group({
      libelle: ['', Validators.required],
      categorie: ['', Validators.required],
      unite: ['', Validators.required],
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
