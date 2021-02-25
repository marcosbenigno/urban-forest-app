import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }
  
  apiUrl: string = 'http://localhost:8000/api/';

  httpHeaders : any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('my_token'),
    }
  };

  showUser(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/showUser/' + id, this.httpHeaders);
  }

  listUsers(): Observable<any> {
    return this.http.get('http://localhost:8000/api/indexUser', this.httpHeaders);
  }

  updateUser(id, form): Observable<any> {
    return this.http.patch('http://localhost:8000/api/updateUser/' + id, form, this.httpHeaders);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete('http://localhost:8000/api/destroyUser/' + id, this.httpHeaders);
  }

  listLikes(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/listLikes/' + id, this.httpHeaders);
  }

  listFollowers(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/listFollowers/' + id, this.httpHeaders);
  }

  listFollowings(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/listFollowings/' + id, this.httpHeaders);
  }
}

