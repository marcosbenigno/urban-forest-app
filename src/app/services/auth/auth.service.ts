import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public http: HttpClient) { }

  apiUrl: string = 'http://localhost:8000/api/';

  httpHeaders : any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  registerUser(form): Observable<any> {
    return this.http.post('http://localhost:8000/api/register', form, {observe: 'response'});
  }

  loginUser(form): Observable<any> {
    return this.http.post('http://localhost:8000/api/login', form, {observe: 'response'});
  }

  logOutUser() {
    localStorage.setItem('my_id', '');
    localStorage.setItem('my_token', '');
  }

  //---- relashionship related functions

  
  httpHeadersWithToken : any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('my_token'),
    }
  };

  followUser(id): Observable<any> {
    console.log(localStorage.getItem('my_token'));
    return this.http.get('http://localhost:8000/api/follow/' + id, this.httpHeadersWithToken);
  }

  unfollowUser(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/unfollow/' + id, this.httpHeadersWithToken);
  }

  likePost(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/likes/' + id, this.httpHeadersWithToken);
  }

  dislikePost(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/deslike/' + id, this.httpHeadersWithToken);
  }

}
