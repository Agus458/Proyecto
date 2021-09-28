import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TieneRolGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let roles = route.data.roles as Array<string>;
    const user = this.authService.getUser()

    if (user) {
      if (roles.find((rol) => rol == "Administrador") && user.tipo == "Administrador") {
        return true;
      }

      if (roles.find((rol) => rol == "Empresa") && user.tipo == "Empresa") {
        return true;
      }

      if (roles.find((rol) => rol == "Postulante") && user.tipo == "Postulante") {
        return true;
      }
    }

    this.snackBar.open("Acceso Denegado", "Close", { duration: 5000 });
    this.router.navigateByUrl("/");
    return false;
  }

}
