import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { OfertaService } from 'src/app/services/ofertas/oferta.service';
import { PerfilService } from 'src/app/services/perfil/perfil.service';

@Component({
  selector: 'app-editar-oferta',
  templateUrl: './editar-oferta.component.html',
  styleUrls: ['./editar-oferta.component.css']
})
export class EditarOfertaComponent implements OnInit {

  visible: boolean | undefined;

  areas: any[] = [];

  empresas: Empresa[] = [];

  ofertaForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private route: ActivatedRoute,
    private ofertasService: OfertaService,
    private perfilService: PerfilService,
    private snackBar: MatSnackBar,
    private router: Router,
    private empresasService: EmpresasService
  ) { }

  async ngOnInit() {
    this.ofertaForm = this.formBuilder.group({
      telefonoContacto: ['', Validators.required],
      emailContacto: ['', Validators.required],
      vacantes: ['', Validators.required],
      requisitosValorados: ['', Validators.required],
      areaDeTrabajo: ['', Validators.required],
      nombreOfferta: ['', Validators.required],
      descripcion: ['', Validators.required],
      puesto: ['', Validators.required],
      funcionesDePuesto: ['', Validators.required],
      requisitosExcluyente: ['', Validators.required],
      horariodetrabajo: ['', Validators.required],
      rangoSalario: ['', Validators.required],
      fechaCierre: ['', Validators.required]
    });

    try {
      const areas = await this.perfilService.getData("areasTematicas").toPromise();
      this.areas = areas;
    } catch (error) {
      console.log(error);
    }

    if(this.authService.getUser()?.tipo == 'Administrador') {

      try {
        const result = await this.empresasService.getEmpresas().toPromise();

        this.empresas = result;
      } catch (error) {
        
      }

      this.ofertaForm.addControl("empresa", new FormControl('', [Validators.required]));
    }

    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));

    if (IdFromRoute) {
      try {
        const oferta = await this.ofertasService.getOferta(IdFromRoute).toPromise();

        if (oferta) {
          this.ofertaForm.addControl("id", new FormControl('', [Validators.required]));

          if(oferta.areaDeTrabajo){
            oferta.areaDeTrabajo = oferta.areaDeTrabajo.id;
          }

          if(oferta.empresa){
            oferta.empresa = oferta.empresa.id;
          }
          
          this.ofertaForm.patchValue(oferta);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  ngOnSubmit() {
    if (this.ofertaForm.contains("id")) {
      const id = this.ofertaForm.controls.id.value;

      this.ofertasService.putOferta(id, this.ofertaForm.value).subscribe(
        ok => {
          this.snackBar.open("Oferta Actualizada Correctamente", "Cerrar", { duration: 5000 });
          this.router.navigateByUrl("/listaofertas");
        },
        error => {
          this.snackBar.open(error.error.message, "Close", { duration: 5000 });
        }
      );
    } else {
      this.ofertasService.postOferta(this.ofertaForm.value).subscribe(
        ok => {
          this.snackBar.open("Oferta Creada Correctamente", "Cerrar", { duration: 5000 });
          this.router.navigateByUrl("/listaofertas");
        },
        error => {
          this.snackBar.open(error.error.message, "Close", { duration: 5000 });
        }
      );
    }
  }
}