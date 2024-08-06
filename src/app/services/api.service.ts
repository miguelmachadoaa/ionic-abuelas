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

  postCria(c:any){
    return this.http.post<any>(`${this.apiUrl}`, c);
  }




}
