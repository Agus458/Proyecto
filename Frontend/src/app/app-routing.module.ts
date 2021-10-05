import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarContraseniaComponent } from './components/cambiar-contrasenia/cambiar-contrasenia.component';
import { ConfirmarEmpresaComponent } from './components/confirmar-empresa/confirmar-empresa.component';
import { DatosPostulanteComponent } from './components/datos-postulante/datos-postulante.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { NuevaOfertaComponent } from './components/nueva-oferta/nueva-oferta.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostularseComponent } from './components/postularse/postularse.component';
import { RegistarseComponent } from './components/registarse/registarse.component';
import { RestablecerContraseniaComponent } from './components/restablecer-contrasenia/restablecer-contrasenia.component';
import { SolicitarEmpresaComponent } from './components/solicitar-empresa/solicitar-empresa.component';
import { IsLoggedInGuard } from './guards/is-logged-in/is-logged-in.guard';
import { TieneRolGuard } from './guards/tiene-rol/tiene-rol.guard';


const routes: Routes = [
  { path: "", component: InicioComponent },

  { path: "iniciarSesion", component: IniciarSesionComponent },
  { path: "registrarse", component: RegistarseComponent },
  { path: "restablecerContrasenia", component: RestablecerContraseniaComponent },
  { path: "cambiarContrasenia", component: CambiarContraseniaComponent },
  { path: "solicitarEmpresa", component: SolicitarEmpresaComponent },
  { path: "confirmarEmpresa", component: ConfirmarEmpresaComponent },

  { path: "misdatos", component: DatosPostulanteComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Postulante'] } },
  { path: "miperfil", component: MiPerfilComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Postulante'] } },
  { path: "nuevaoferta", component: NuevaOfertaComponent },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
