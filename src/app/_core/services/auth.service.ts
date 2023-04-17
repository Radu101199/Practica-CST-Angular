import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _url = 'https://reqres.in';
  private _isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this._isLoggedInSubject.next(this.isLoggedIn());
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this._url}/api/users`, user);
  }

  login(account: any): Observable<any> {
    return this.http.post<string>(`${this._url}/api/login`, account);
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this._isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('username') && localStorage.getItem('token') || sessionStorage.getItem('username') && sessionStorage.getItem('token') !== undefined)
      return true;
    return false;
  }
}
