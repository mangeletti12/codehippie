import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PermService {

  constructor(
    private http: HttpClient,
    ) {

  }

  getPerms(): Observable<any> {
    const url = 'assets/perms-mock.json';

    return this.http.get<any>(url);
  }

}
