import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { proyectConfig } from 'proyectConfig';

@Injectable({
  providedIn: 'root'
})
export class PostulantesService {

  private url: string = proyectConfig.backEndURL + "/postulantes";

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

}
