import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-confirmar-empresa',
  templateUrl: './confirmar-empresa.component.html',
  styleUrls: ['./confirmar-empresa.component.css']
})
export class ConfirmarEmpresaComponent implements OnInit {

  token: string | undefined;

  rut: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
      this.rut = params.rut
    });
  }

  
}
