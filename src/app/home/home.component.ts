import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChange } from '@angular/core';

import { FavouriteService } from '../favourite.service';
import { LoginService } from '../services/login.service';
import { NewsServiceService } from '../services/news-service.service';
import { ReferService } from '../services/refer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:any;
  cont: any;
  isVisible: boolean = false;
  logged=localStorage.getItem("loggedEmail")!;
  welcome:String="Welcome to the News App! Explore latest news and updates."

  constructor(private newsService: NewsServiceService,private loginService:LoginService,private referService:ReferService, private http: HttpClient,private favouriteService:FavouriteService) { }

  ngOnInit(): void {
    this.getName();

    this.newsService.result.asObservable().subscribe(res => {
      this.cont = res;
      console.log(this.cont)
    })

    this.getNews()
    
  }
  getName(){
    if(this.logged!=null){
    this.loginService.getUser(this.logged).subscribe(
      response=>{
        this.user=response;
        console.log(this.user.firstName);
        this.welcome=this.user.firstName;
        this.welcome="Welcome, "+this.user.firstName+"! Explore the latest news and updates.";
      }
    )
    }
  }
  getNews() {
    this.newsService.getNews().subscribe((res: any) => {
      this.newsService.result.next(res.articles)
    }, err => {
      console.log("Error: " + err)
    })

  }

  markFavorite(i: number) {
    let article = this.cont[i]
    
    let grayStar = document.getElementById(`grayStar${i}`);
    let yellowStar = document.getElementById(`yellowStar${i}`);
    grayStar ? grayStar.style.display = "none" : null;
    yellowStar ? yellowStar.style.display = "block" : null;

    // document.getElementById("yellowStar").style.display = "block"
    console.log(article)

    // let url = "backend_endpoint"
    // this.http.post(url, article).subscribe(res => {
    //   console.log(res);
    // }, err => {
    //   console.log("Error: " + err)
    // })
  }

  unmarkFavorite(i: number) {
    let article = this.cont[i]

    let grayStar = document.getElementById(`grayStar${i}`);
    let yellowStar = document.getElementById(`yellowStar${i}`);
    grayStar ? grayStar.style.display = "block" : null;
    yellowStar ? yellowStar.style.display = "none" : null;
    console.log(article)

    // let url = "backend_endpoint"
    // this.http.post(url, article).subscribe(res => {
    //   console.log(res);
    // }, err => {
    //   console.log("Error: " + err)
    // })
  }
  addFav(i:number){
    console.log("This is add fav");
    let article=this.cont[i];
   
    if(this.logged!=null){
    this.favouriteService.addFav(this.logged,article).subscribe(
      response=>{
        console.log("this is response")
        console.log(response)
      },
      err=>{
        console.log(err)
      }
    )
    }
    else{
      window.location.href="/Favourite";
    }

  }
  addRefer(i:number){
    let article=this.cont[i];
    if(this.logged!=null){
    this.referService.addRef(this.logged,article).subscribe(
      response=>{
        console.log(response)
      },
      err=>{
        console.log(err)
      }
    )
    }
  }
  


}
