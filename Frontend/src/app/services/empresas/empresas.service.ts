import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { proyectConfig } from 'proyectConfig';
import { Empresa } from 'src/app/models/empresa.model';
import { Pagination } from 'src/app/models/pagination.mode';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private url: string = proyectConfig.backEndURL + "/api/empresas";

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: SocialAuthService
  ) { }

  getEmpresas(skip?: number, take?: number, filters?: any) {
    const params: any = {
      skip: skip ?? 0,
      take: take ?? 10
    }

    Object.assign(params, filters);

    return this.http.get<Pagination<Empresa>>(this.url, {
      params
    });
  }
}
