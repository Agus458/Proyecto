import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
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
    private router: Router,
    private authService: SocialAuthService
  ) { }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getExp(): string | null {
    return localStorage.getItem("exp");
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
        localStorage.setItem("exp", result.exp);
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
        localStorage.setItem("exp", result.exp);
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

  async signInWithGoogle(): Promise<void> {
    try {
      const user = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.http.post<any>(this.url + "/iniciarSocial", { user }).subscribe(
        result => {
          localStorage.setItem("token", result.token);
          localStorage.setItem("exp", result.exp);
          localStorage.setItem("usuario", JSON.stringify(result.usuario));

          this.snackBar.open("Login exitoso!", "Close", { duration: 5000 });

          this.router.navigateByUrl("/");
        },
        error => {
          this.snackBar.open(error.error.message, "Close", { duration: 5000 });
        }
      );
    } catch (error) {
      console.log(error);

      this.snackBar.open("Error al Iniciar por Google", "Close", { duration: 5000 });
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  restablecerContrasenia(email: string) {
    this.http.post(this.url + "/restablecerContrasenia", { email }).subscribe(
      ok => {
        this.snackBar.open("Se a enviado un email", "Close", { duration: 5000 });

        this.router.navigateByUrl("/");
      },
      error => {
        this.snackBar.open(error.error.message, "Close", { duration: 5000 });
      }
    );
  }

  cambiarContrasenia(token: string, contrasenia: string) {
    this.http.post(this.url + "/cambiarContrasenia", { token, contrasenia }).subscribe(
      ok => {
        this.snackBar.open("Contrasenia Restablecida exitosamente!", "Close", { duration: 5000 });

        this.router.navigateByUrl("/iniciarSesion");
      },
      error => {
        this.snackBar.open(error.error.message, "Close", { duration: 5000 });
      }
    );
  }

  solicitarEmpresa(data: any) {
    this.http.post(this.url + "/solicitarEmpresa", data).subscribe(
      (ok: any) => {
        this.router.navigate(["/confirmarEmpresa"], { queryParams: { token: ok.token, rut: ok.rut } });
      },
      error => {
        this.snackBar.open(error.error.message, "Close", { duration: 5000 });
      }
    );
  }

  confirmarEmpresa(data: any) {
    this.http.post(this.url + "/confirmarEmpresa", data).subscribe(
      ok => {
        this.snackBar.open("Se a enviado un email al administrador", "Close", { duration: 5000 });
        this.router.navigateByUrl("/");
      },
      error => {
        this.snackBar.open(error.error.message, "Close", { duration: 5000 });
      }
    );
  }
}
