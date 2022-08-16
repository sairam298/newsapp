import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url="http://localhost:8990/user"


  constructor(private http:HttpClient) { }

  generatetoken(email:string,password:String){
    localStorage.setItem("loggedEmail",email);
    return this.http.post(`${this.url}/authenticate`,{"email":email,"password":password},{responseType: 'text'})
    
  }
  loginUser(token: string){
    localStorage.setItem("token",token);
    return true;
  }

  isLoggedIn(){
    let token=localStorage.getItem("token");
    if(token==undefined || token=="" || token==null){
      return false;
    }
    else{
      return true;
    }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('loggedEmail');
    return true;
  }

  getToken(){
    return localStorage.getItem("token");
  }
  registeruser(newUser:any){
    return this.http.post(`${this.url}/register`,newUser);

  }
  getUser(email:String){
    return this.http.get(`${this.url}/${email}/getDetails`);

  }
  updateUser(userd:any){
    return this.http.post(`${this.url}/${userd.email}/update`,userd);
  }
}
