import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http:HttpClient) { }

  loginUser(data:any){
    return this.http.post("http://localhost:8000/api/user/login",data)
  }

  registerUser(data:any){
    return this.http.post("http://localhost:8000/api/user/register",data)
  }
}
