import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Alert } from 'src/app/model/Alert';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-technicien',
  templateUrl: './create-technicien.component.html',
  styleUrls: ['./create-technicien.component.scss']
})
export class CreateTechnicienComponent {

  form: FormGroup;
  submitted = false;
  loading = false;
  alerte = '';

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateTechnicienComponent>,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  get f(): any { return this.form.controls; }

  async onSubmit(): Promise<any> {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    const technicien = this.form.value;
    technicien.email = technicien.email + '@green-repack.fr';
    try {
      await this.userService.createTechnicien(technicien);
      this.dialogRef.close();

    } catch (err) {
      this.alerte = err.response.data.message;
      this.loading = false;
    }
  }

  closeDialog(): void{
    this.dialogRef.close();
  }

  removeAlert(): void {
    this.alerte = '';
  }

}
