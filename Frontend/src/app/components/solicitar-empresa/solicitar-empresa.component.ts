import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-solicitar-empresa',
  templateUrl: './solicitar-empresa.component.html',
  styleUrls: ['./solicitar-empresa.component.css']
})
export class SolicitarEmpresaComponent implements OnInit {

  solicitarEmpresaForm: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.solicitarEmpresaForm = this.fb.group({
      rut: ['', [Validators.required]],
    });
  }

  ngOnSubmit(): void {
    const { rut } = this.solicitarEmpresaForm.value;

    this.authService.solicitarEmpresa(rut);
  }

}
