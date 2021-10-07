import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosPostulanteComponent } from './components/datos-postulante/datos-postulante.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { AgregarnovedadesComponent } from './components/novedades/admin/agregarnovedades/agregarnovedades.component';
import { ListarnovedadesComponent } from './components/novedades/admin/listarnovedades/listarnovedades.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { NuevaOfertaComponent } from './components/nueva-oferta/nueva-oferta.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostularseComponent } from './components/postularse/postularse.component';
import { RegistarseComponent } from './components/registarse/registarse.component';
import { IsLoggedInGuard } from './guards/is-logged-in/is-logged-in.guard';
import { TieneRolGuard } from './guards/tiene-rol/tiene-rol.guard';


const routes: Routes = [
  { path: "", component: InicioComponent },
  { path: "iniciarSesion", component: IniciarSesionComponent },
  { path: "registrarse", component: RegistarseComponent },
  { path: "misdatos", component: DatosPostulanteComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Postulante'] } },
  { path: "miperfil", component: MiPerfilComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Postulante'] } },
  { path: "nuevaoferta", component: NuevaOfertaComponent },
  { path: "novedades", component: NovedadesComponent },
  { path: "agregarnovedad", component: AgregarnovedadesComponent },
  { path: "listarnovedades", component: ListarnovedadesComponent },


  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
