import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http: HttpClient) { }

  apiUrl: string = 'http://localhost:8000/api/';

  httpHeaders : any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  createPost(form): Observable<any> {
    return this.http.post('http://localhost:8000/api/createPost', form);
  }

  showPost(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/showPost/' + id, this.httpHeaders);
  }

  listPosts(): Observable<any> {
    return this.http.get('http://localhost:8000/api/indexPost', this.httpHeaders);
  }

  updatePost(id, form): Observable<any> {
    return this.http.patch('http://localhost:8000/api/updatePost/' + id, form);
  }

  deletePost(id): Observable<any> {
    return this.http.delete('http://localhost:8000/api/destroyPost/' + id, this.httpHeaders);
  }

  listPostsByUser(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/getPostByUser/' + id, this.httpHeaders);
  }

  httpHeadersWithToken : any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('my_token'),
    }
  };

  listPostsFromUser(): Observable<any> {
    return this.http.get('http://localhost:8000/api/listPostFollow', this.httpHeadersWithToken);
  }

}
