import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(public http: HttpClient) { }

  apiUrl: string = 'http://localhost:8000/api/';

  httpHeaders : any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  createComment(form): Observable<any> {
    return this.http.post('http://localhost:8000/api/createComment', form);
  }

  listComments(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/getPostByComment/' + id, this.httpHeaders);
  }

  deleteComment(id): Observable<any> {
    return this.http.delete('http://localhost:8000/api/destroyComment/' + id, this.httpHeaders);
  }

}
