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

  getData() {
    return  this.http.get(`${this.apiUrl}`);
  }

  getUsuarios() {
    return  this.http.get(`${this.apiUrl}/usuarios`);
  }

  getPesajes() {
    return  this.http.get(`${this.apiUrl}/pesaje`);
  }

  getCrias() {
    return  this.http.get(`${this.apiUrl}/crias`);
  }

  getAlmacen() {
    return  this.http.get(`${this.apiUrl}/almacen`);
  }

  getCentro() {
    return  this.http.get(`${this.apiUrl}/centro`);
  }

  getEmpresa() {
    return  this.http.get(`${this.apiUrl}/empresa`);
  }

  getMaterial() {
    return  this.http.get(`${this.apiUrl}/material`);
  }

  getLotaje() {
    return  this.http.get(`${this.apiUrl}/lotaje`);
  }

  postCria(c:any){
    return this.http.post<any>(`${this.apiUrl}`, c);
  }

  postPesaje(c:any){
    let urlPesaje = this.apiUrl+'/pesaje'
    return this.http.post<any>(`${urlPesaje}`, c);
  }



}
