import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-restablecer-contrasenia',
  templateUrl: './restablecer-contrasenia.component.html',
  styleUrls: ['./restablecer-contrasenia.component.css']
})
export class RestablecerContraseniaComponent implements OnInit {

  restablecerContraseniaForm: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.restablecerContraseniaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnSubmit(): void {
    const { email } = this.restablecerContraseniaForm.value;

    this.authService.restablecerContrasenia(email);
  }

}
