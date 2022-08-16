import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FavouriteService } from '../favourite.service';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {

  searchText: BehaviorSubject<string> = new BehaviorSubject("");
  result: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private https: HttpClient,private favouriteService:FavouriteService) { }

  getNews(): Observable<any> {

    let url = "https://newsapi.org/v2/everything?q=" + this.searchText.value + "bitcoin&apiKey=baa4146ec5fe494884f7cec742e93e94"
    console.log(url)
    return this.https.get(url) as Observable<any>
  }

  getFavNews():Observable<any>
  {
    let logged!: string;
    logged=localStorage.getItem("loggedEmail")!;
    console.log("This is Test"+logged);
    return this.favouriteService.getFav(logged);
  }
}
