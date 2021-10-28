import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,

  ) {
    if (userService.loggedIn()) {
      router.navigate(['produits']);
    }
  }

  ngOnInit(): void {
    if (this.userService.loggedIn()) {
      this.userService.setIsLogged(true);
      this.router.navigate(['produits']);
    }
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f(): any {
    return this.form.controls;
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    try {
      this.loading = true;
      const res = await this.userService.login(this.form.value);
      if (res.error){
        throw res.error;
      }
      localStorage.setItem('green-repack-user-email', this.f.email.value);
      localStorage.setItem('green-repack-user-tk', res.token);
      this.userService.setIsLogged(true);
      this.router.navigate([this.returnUrl]);
    }catch (error) {
      this.alertService.error(error.response.data);
      this.loading = false;
    }
  }

}
