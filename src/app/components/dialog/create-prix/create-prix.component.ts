import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categorie } from 'src/app/model/Categorie';

@Component({
  selector: 'app-create-prix',
  templateUrl: './create-prix.component.html',
  styleUrls: ['./create-prix.component.scss']
})
export class CreatePrixComponent {


  form: FormGroup;
  categories: Categorie[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreatePrixComponent>
  ) {
    this.categories = data.categories
    this.form = this.formBuilder.group({
      
      titre: ['', Validators.required],
      prix: ['', Validators.required],
      categorie: ['', Validators.required]
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
