import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient ) { }

  putUser(data:any,id:any){
    return this._http.put<any>("http://localhost:8000/api/user/"+id,data).pipe(
   map(
    (res=>{
      return res
    })))
  }

  postUser(data:any){
    return this._http.post<any>("http://localhost:8000/api/user/register",data).pipe(
   map(
    (res=>{
      return res
    })))
  }


  deleteUser(id:any){
    return this._http.delete<any>("http://localhost:8000/api/user/"+id).pipe(
   map(
    (res=>{
      return res
    })))
  }

  getUser(){
    return this._http.get<any>("http://localhost:8000/api/user/").pipe(
   map(
    (res=>{
      return res
    })))
  }
}
