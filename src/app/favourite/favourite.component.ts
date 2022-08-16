import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../favourite.service';
import { LoginService } from '../services/login.service';
import { NewsServiceService } from '../services/news-service.service';
import { ReferService } from '../services/refer.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  message:String="No Favourites yet!";
  favNews:any;
  refNews:any;
  news:boolean;
  logged=localStorage.getItem("loggedEmail")!;
  constructor(private favouriteService:FavouriteService,private newsService:NewsServiceService,private referService:ReferService) { }

  ngOnInit(): void {
    this.showFav();
  }
  showFav(){
    this.newsService.getFavNews().subscribe(
      response=>{
        if(response.length==0){
          this.getRecommend();
        }
        else{
          this.favNews=response;
          this.message="Favourite Articles"
          this.news=true
        }
        
      },
      err=>
      {
        console.log(err);
      }
    )
  }
  deleteFav(i:number){
    let article=this.favNews[i];
    
    this.favouriteService.deleteFav(this.logged,article.url).subscribe(
      response=>{
        console.log(response)
        this.showFav();
      },
      err=>{
        console.log(err)
      }
    )

  }
  addFav(i:number){
    console.log("This is add fav");
    let article=this.favNews[i];
   
    if(this.logged!=null){
    this.favouriteService.addFav(this.logged,article).subscribe(
      response=>{
        this.showFav();
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
  getRecommend(){
    this.referService.getRef(this.logged).subscribe(
      response=>{
        console.log(response)
        this.favNews=response;
        this.news=false;
        this.message="No favourite Articles yet! You can refer below Recommended Articles."
      },
      err=>{
        this.newsService.getNews().subscribe(
          response=>{
            this.favNews=response.articles;
            this.news=false;
            this.message="No favourite Articles yet! You can refer below Recommended Articles."
          }
        )
      }
    )
  }
  addRefer(i:number){
    let article=this.favNews[i];
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
