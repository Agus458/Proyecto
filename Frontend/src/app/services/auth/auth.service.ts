import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { proyectConfig } from 'proyectConfig';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = proyectConfig.backEndURL + "/api/auth";

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getUser(): Usuario | null {
    const usuario = localStorage.getItem("usuario");

    if (usuario) {
      return JSON.parse(usuario);
    }

    return null;
  }

  isLogged(): boolean {
    return localStorage.getItem("usuario") != null;
  }

  iniciarSesion(email: string, contrasenia: string): void {
    this.http.post<any>(this.url + "/iniciarSesion", { email, contrasenia }).subscribe(
      result => {
        localStorage.setItem("token", result.token);
        localStorage.setItem("usuario", JSON.stringify(result.usuario));

        this.snackBar.open("Login exitoso!", "Close", { duration: 5000 });

        this.router.navigateByUrl("/");
      },
      error => {
        this.snackBar.open(error.error.message, "Close", { duration: 5000 });
      }
    );
  }

  registrarse(email: string, contrasenia: string): void {
    this.http.post<any>(this.url + "/registrarse", { email, contrasenia }).subscribe(
      result => {
        localStorage.setItem("token", result.token);
        localStorage.setItem("usuario", JSON.stringify(result.usuario));

        this.snackBar.open("Registro exitoso!", "Close", { duration: 5000 });

        this.router.navigateByUrl("/");
      },
      error => {
        this.snackBar.open(error.error.message, "Close", { duration: 5000 });
      }
    );
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigateByUrl("/");
  }

}
