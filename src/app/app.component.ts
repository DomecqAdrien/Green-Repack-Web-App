import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isLogged: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {}


  ngOnInit(): void {
    if (this.loginService.loggedIn()) {
      this.loginService.setIsLogged(true);
      //this.isLogged = true;
    }
    this.loginService.isLogged.subscribe(isLogged => this.isLogged = isLogged);
    //console.log(this.isLogged);
  }

  logout(): void{
    this.loginService.logout();
    //this.router.navigate(['logout']);
  }
}
