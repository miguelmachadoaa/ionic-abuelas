import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email : string;
  public password : string;
  public users : any;

  constructor(
    private loginService: LoginService
  ) {

    this.password='';
    this.email = null;

   }

  ngOnInit() {
  }

  login(){
    // Leemos los datos de la base de datos
    this.loginService.login(this.email, this.password).then( (users: string[]) => {
      this.users = users;
      console.log("Leido");
      console.log(this.users);
    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }

}
