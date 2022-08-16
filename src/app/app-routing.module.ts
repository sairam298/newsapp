import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { AuthGuard } from './services/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';



const routes: Routes = [
  
  {
    path:"",
  component: HomeComponent
},
  {
    path:"Login",
    component: LoginComponent
  },
  {
    path:"Home",
    component:HomeComponent
  },
  {
    path:"Favourite",
    component:FavouriteComponent,
    canActivate:[AuthGuard]

  },
  {
    path:"edit",
    component:EditProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"Search",
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
