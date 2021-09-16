import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getUser(): Usuario | null {
    const usuario = localStorage.getItem("usuario");
    console.log(usuario);
    
    if (usuario) {
      return JSON.parse(usuario);
    }

    return null;
  }

  isLogged() {
    return localStorage.getItem("usuario") != null;
  }

  iniciarSesion(email: string, contrasenia: string) {
    return this.http.post<any>("http://localhost:3000/api/auth/iniciarSesion", { email, contrasenia });
  }

  cerrarSesion() {
    localStorage.clear()
  }

}
