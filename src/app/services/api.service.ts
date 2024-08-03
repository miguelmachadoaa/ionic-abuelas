import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "http://localhost:8001/api"

  constructor(
    private http:HttpClient
  ) { 
  }

  getDatos() {
    let datos =  this.http.get(`${this.apiUrl}`);
    console.log(datos);
    return datos;
  }


}
