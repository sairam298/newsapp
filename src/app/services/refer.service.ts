import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReferService {
  url="http://localhost:8990/refer"
  constructor(private http:HttpClient) { }
  getRef(email:String){
    return this.http.get(`${this.url}/${email}/getRefer`);
  }
  addRef(email:String,article:any){
    return this.http.post(`${this.url}/${email}/addRef`,article);
  }
}
