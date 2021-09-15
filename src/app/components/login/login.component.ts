import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { LoginService } from 'src/app/services/login.service';
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
    private loginService: LoginService

  ) {
    if (loginService.loggedIn()) {
      console.log('logged');
      router.navigate(['produits']);
    }
  }

  ngOnInit(): void {
    if (this.loginService.loggedIn()) {
      this.loginService.setIsLogged(true);
      console.log(this.loginService.isLogged);
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

  onSubmit(): void {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    console.log(this.form.value);
    this.loading = true;
    this.userService.login(this.form.value).then(res => {
        console.log(res);
        localStorage.setItem('green-repack-user-email', this.f.email.value);
        localStorage.setItem('green-repack-user-tk', res.token);
        this.loginService.setIsLogged(true);
        this.router.navigate([this.returnUrl]);
    }).catch(error => {
        console.log(error);
        this.alertService.error(error);
        this.loading = false;
    });
  }

}
