import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { match } from 'src/app/validators/match.validator';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css']
})
export class CambiarContraseniaComponent implements OnInit {

  cambiarContraseniaForm: FormGroup = new FormGroup({});
  token: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.token = params.token);

    this.cambiarContraseniaForm = this.formBuilder.group({
      contrasenia: ['', [Validators.required]],
      contraseniaRepetida: ['', [Validators.required]]
    }, {
      validator: match("contrasenia", "contraseniaRepetida")
    });
  }

  ngOnSubmit(): void {
    const { contrasenia } = this.cambiarContraseniaForm.value;

    if (this.token) {
      this.authService.cambiarContrasenia(this.token, contrasenia);
    }
  }

  get contraseniaRepetida() {
    return this.cambiarContraseniaForm.get("contraseniaRepetida");
  }

}
