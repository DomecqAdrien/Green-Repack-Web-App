import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateTechnicienComponent } from '../create-technicien/create-technicien.component';

@Component({
  selector: 'app-create-unite',
  templateUrl: './create-unite.component.html',
  styleUrls: ['./create-unite.component.scss']
})
export class CreateUniteComponent {


  form: FormGroup;
  types: String[] = ['Text', 'Number'];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateUniteComponent>
  ) {
    this.form = this.formBuilder.group({
      
      libelle: ['', Validators.required],
      abreviation: ['', Validators.required],
      type: ['', Validators.required]
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
