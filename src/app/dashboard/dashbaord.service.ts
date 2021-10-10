import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })

export class DashboardService{

    constructor(private http: HttpClient) {}
    //Get Users
    getAllUser() :Observable<any> {
      return this.http.get<any>(`${environment.serverURL}/user/getAll`);
    }
    //Get Comments
    getAllComments() :Observable<any>{
        return this.http.get<any>(`${environment.serverURL}/commnet/getAll`);
    }
    //Get post
    getAllPost() :Observable<any>{
        return this.http.get<any>(`${environment.serverURL}/post/getAll`);
    }

}