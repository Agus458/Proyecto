import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosPostulanteComponent } from './components/datos-postulante/datos-postulante.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistarseComponent } from './components/registarse/registarse.component';

const routes: Routes = [
  {path: "", component: InicioComponent},
  {path: "iniciarSesion", component: IniciarSesionComponent},
  {path: "registrarse", component: RegistarseComponent},
  {path: "misdatos", component: DatosPostulanteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
