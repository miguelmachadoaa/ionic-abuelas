import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../../services/sqlite.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-crias',
  templateUrl: './crias.page.html',
  styleUrls: ['./crias.page.scss'],
})
export class CriasPage implements OnInit {

  public consumo: string;
  public mortalidad: string;
  public fecha: string;
  public formattedDate: string;

  public crias: string[];

  public currentDate:string;

  constructor(
    private sqlite: SqliteService,
    private apiService: ApiService
  ) { 

    const date = new Date();
    this.currentDate = date.toISOString();

    this.consumo='';
    this.mortalidad='';
    this.fecha='';
    this.crias=[];
  }

  ionViewWillEnter(){
    this.read();
    
  }

  read(){
    // Leemos los datos de la base de datos
    this.sqlite.readCrias().then( (crias: string[]) => {
      this.crias = crias;
      console.log("Leido");
      console.log(this.crias);
    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }
  

  ngOnInit() {
  }

  create(){
    // Creamos un elemento en la base de datos
    this.sqlite.createCrias(this.consumo, this.mortalidad, this.currentDate).then( (changes) =>{
      console.log(changes);
      console.log("Creado");
      this.consumo = '';
      this.mortalidad = '';
      this.read(); // Volvemos a leer
    }).catch(err => {
      console.error(err);
      console.error("Error al crear");
    })
  }

  update(i:any){

  }
  delete(i:any){

  }

}
