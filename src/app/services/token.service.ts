import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  //constructor() { }

  saveToken(token: string) {
    //localStorage.setItem('token', token); // localStorage is not secure
    //sessionStorage.setItem('token', token); // sessionStorage is not secure but it is cleared when the browser is closed
    document.cookie = `token=${token}; SameSite=Lax; max-age=259200; Secure`; // cookie is secure but it is not cleared when the browser is closed
  }

  getToken() {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    //return localStorage.getItem('token');
    //return sessionStorage.getItem('token');
    return cookieValue;
  }
}
