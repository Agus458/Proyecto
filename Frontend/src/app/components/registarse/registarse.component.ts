import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { match } from 'src/app/validators/match.validator';

@Component({
  selector: 'app-registarse',
  templateUrl: './registarse.component.html',
  styleUrls: ['./registarse.component.css']
})
export class RegistarseComponent implements OnInit {

  registrarseForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registrarseForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required]],
      contraseniaRepetida: ['', [Validators.required]]
    }, {
      validator: match("contrasenia", "contraseniaRepetida")
    });
  }

  ngOnSubmit(): void {
    const { email, contrasenia } = this.registrarseForm.value;

    this.authService.registrarse(email, contrasenia);
  }

  get contraseniaRepetida() {
    return this.registrarseForm.get("contraseniaRepetida");
  }

  signInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  signInWithFB(): void {
    this.authService.signInWithFB();
  }

}
