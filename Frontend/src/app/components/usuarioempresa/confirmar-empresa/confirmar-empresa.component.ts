import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Departamento } from 'src/app/models/departamento.model';
import { Localidad } from 'src/app/models/localidad.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DepartamentosService } from 'src/app/services/departamentos/departamentos.service';
import { LocalidadesService } from 'src/app/services/localidades/localidades.service';

@Component({
  selector: 'app-confirmar-empresa',
  templateUrl: './confirmar-empresa.component.html',
  styleUrls: ['./confirmar-empresa.component.css']
})
export class ConfirmarEmpresaComponent implements OnInit {

  token: any;

  empresa: any;

  confirmarSolicitudForm: FormGroup = new FormGroup({});

  departamentos: Departamento[] = [];
  selectedDepartamento: number | undefined;

  localidades: Localidad[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private departamentosService: DepartamentosService,
    private localidadesService: LocalidadesService,
  ) { }

  ngOnInit(): void {
    let aux: any = localStorage.getItem("empresa");

    if (aux) {
      aux = JSON.parse(aux);
      this.empresa = aux.empresa;
      this.token = aux.token;

      if(this.empresa.localidad){
        this.empresa.departamento = this.empresa.localidad.departamento.id;
        this.empresa.localidad = this.empresa.localidad.id;
      }
    }
    
    this.departamentosService.getByPais(1).subscribe(
      result => {
        this.departamentos = result;
      }
    );

    this.confirmarSolicitudForm = this.formBuilder.group({
      token: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required]],
      rut: ['', Validators.required],
      razonSocial: ['', Validators.required],
      telefono: ['', Validators.required],
      nombreFantasia: ['', Validators.required],
      localidad: ['', Validators.required],
      departamento: ['', Validators.required],
      visivilidad: [false, Validators.required]
    });
    
    this.confirmarSolicitudForm.patchValue(this.empresa);
    this.confirmarSolicitudForm.patchValue({ token: this.token });
    
    this.onChangeDepartamento();
  }

  ngOnSubmit(): void {
    const data = this.confirmarSolicitudForm.value;

    console.log(data);

    this.authService.confirmarEmpresa(data);
  }

  onChangeDepartamento(): void {
    this.selectedDepartamento = this.confirmarSolicitudForm.get("departamento")?.value;

    if (this.selectedDepartamento) {
      this.localidadesService.getByDepartamento(this.selectedDepartamento).subscribe(
        result => {
          this.localidades = result;
        }
      );
    }
  }

}
