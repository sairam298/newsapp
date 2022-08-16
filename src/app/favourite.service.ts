import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  url="http://localhost:8990/fav";
  constructor(private http:HttpClient) { }
  getFav(email:String){
    return this.http.get(`${this.url}/${email}/getFav`);

  }

  addFav(email: any,article: any){
    return this.http.post(`${this.url}/${email}/addFav`,article);
  }
  deleteFav(email:any,article:any){
    return this.http.post(`${this.url}/${email}/deleteFav`,article);
  }

}
