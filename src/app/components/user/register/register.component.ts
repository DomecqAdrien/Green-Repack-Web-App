import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { UserService } from 'src/app/services/user.service';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private alertService: AlertService
  ) { }

  ngOnInit(): any {
      this.form = this.formBuilder.group({
          prenom: ['', Validators.required],
          nom: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          // password_check: ['', Validators.required],
          adresse: ['', Validators.required],
          dateNaissance: ['', Validators.required],
          codePostal: ['', Validators.required],
          ville: ['', Validators.required],
      });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.form.controls; }

  onSubmit(): any {

      this.submitted = true;
      this.alertService.clear();
      if (this.form.invalid) {
          return;
      }

      const data = this.form.value;
      data.dateNaissance = data.dateNaissance.format('YYYY-MM-DD');

      this.loading = true;
      this.userService.register(data).then(res => {
        this.alertService.success('Registration successful', { keepAfterRouteChange: true });
        this.router.navigate(['../login'], { relativeTo: this.route });
      }).catch(err => {
        this.alertService.error(err.response.data.message);
        this.loading = false;
      });
  }
}
