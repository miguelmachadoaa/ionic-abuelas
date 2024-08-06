import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../../services/sqlite.service';
import { ApiService } from '../../services/api.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  public data: any;

  public load : boolean;
  public message : string;
  public crias : any;

  constructor(
    private sqlite: SqliteService,
    private usersService: UsersService,
    private apiService: ApiService
  ) { 

    this.load = false;
    this.crias = [];
    this.message = '';

  }

  ngOnInit() {
  }

  importar(){

    this.load = true;

    this.apiService.getData().subscribe((response) => {
      this.data = response;
      console.log(this.data);

      this.deleteAllUsers();

      this.load = false;
      this.message = 'Data cargada satisfactoriamente';
    });

  }

  saveUsers(){

        this.usersService.createUsers(this.data.data.usuarios).then( (changes) =>{
          console.log("Creado");
        }).catch(err => {
          console.error(err);
          console.error("Error al crear");
        })
    
  }

  deleteAllUsers(){
    // Borramos el elemento
    this.usersService.deleteAllUsers().then( (changes) => {
      console.log(changes);
      console.log("Borrado");

      this.saveUsers();

    }).catch(err => {
      console.error(err);
      console.error("Error al borrar");
    })
  }

  enviar(){

      // Leemos los datos de la base de datos
      this.sqlite.readCrias().then( (crias: string[]) => {
        this.crias = crias;
        console.log("Leido");
        console.log(this.crias);

        this.apiService.postCria(this.crias).subscribe((response:any)=>{
          console.log(response);
        });

      }).catch(err => {
        console.error(err);
        console.error("Error al leer");
      })
    }

}
