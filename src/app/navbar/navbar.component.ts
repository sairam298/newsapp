import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from '../services/login.service';
import { NewsServiceService } from '../services/news-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchT: string;
  public loggedIn:boolean=false;
 
  constructor(private newsService: NewsServiceService,private loginService:LoginService) { }

  ngOnInit(): void {
    this.loggedIn=this.loginService.isLoggedIn();
  }

  search() {
   
    this.newsService.searchText.next(this.searchT)
    this.newsService.getNews().subscribe((res: any) => {
      this.newsService.result.next(res.articles)

    }, err => {
      console.log("Error: " + err)
    })

  }
  logoutUser(){
    this.loginService.logout();
    location.reload();
  }

}
