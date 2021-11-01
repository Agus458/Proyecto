import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarContraseniaComponent } from './components/contrasenia/cambiar-contrasenia/cambiar-contrasenia.component';
import { ConfirmarEmpresaComponent } from './components/usuarioempresa/confirmar-empresa/confirmar-empresa.component';
import { DatosPostulanteComponent } from './components/datos-postulante/datos-postulante.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { AgregarnovedadesComponent } from './components/novedades/admin/agregarnovedades/agregarnovedades.component';
import { ListarnovedadesComponent } from './components/novedades/admin/listarnovedades/listarnovedades.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegistarseComponent } from './components/registarse/registarse.component';
import { RestablecerContraseniaComponent } from './components/contrasenia/restablecer-contrasenia/restablecer-contrasenia.component';
import { SolicitarEmpresaComponent } from './components/usuarioempresa/solicitar-empresa/solicitar-empresa.component';
import { IsLoggedInGuard } from './guards/is-logged-in/is-logged-in.guard';
import { TieneRolGuard } from './guards/tiene-rol/tiene-rol.guard';
import { MisofertasempresaComponent } from './components/ofertas/empresa/misofertasempresa/misofertasempresa.component';
import { EditarOfertaComponent } from './components/ofertas/empresa/editar-oferta/editar-oferta.component';
import { HabilitarEmpresaComponent } from './components/empresa/habilitar-empresa/habilitar-empresa.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
import { VistaNovedadComponent } from './components/novedades/vista-novedad/vista-novedad.component';
import { ListaPostulantesComponent } from './components/ofertas/empresa/lista-postulantes/lista-postulantes.component';
import { DashComponent } from './components/dash/dash.component';
import { PostulacionesComponent } from './components/postulaciones/postulaciones.component';

const routes: Routes = [
  { path: "", component: InicioComponent },

  { path: "iniciarSesion", component: IniciarSesionComponent },
  { path: "registrarse", component: RegistarseComponent },
  { path: "restablecerContrasenia", component: RestablecerContraseniaComponent },
  { path: "cambiarContrasenia", component: CambiarContraseniaComponent },
  { path: "solicitarEmpresa", component: SolicitarEmpresaComponent },
  { path: "confirmarEmpresa", component: ConfirmarEmpresaComponent },
  { path: "vistanovedad/:id", component: VistaNovedadComponent },
  { path: "oferta/:id", component: OfertasComponent },

  { path: "misdatos", component: DatosPostulanteComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Postulante'] } },
  { path: "postulaciones", component: PostulacionesComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Postulante'] } },
  { path: "miperfil", component: MiPerfilComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Postulante'] } },
  { path: "postulante/:id", component: MiPerfilComponent, canActivate: [IsLoggedInGuard] },

  { path: "editaroferta", component: EditarOfertaComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Administrador', 'Empresa'] } },
  { path: "editaroferta/:id", component: EditarOfertaComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Administrador', 'Empresa'] } },
  { path: "listaofertas", component: MisofertasempresaComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Administrador', 'Empresa'] } },
  { path: "postulantespublicos", component: ListaPostulantesComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Administrador', 'Empresa'] } },
  { path: "postulantesOferta/:id", component: ListaPostulantesComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Empresa'] } },

  { path: "novedades", component: NovedadesComponent },
  { path: "agregarnovedad", component: AgregarnovedadesComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Administrador'] } },
  { path: "editarnovedad/:id", component: AgregarnovedadesComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Administrador'] } },
  { path: "listarnovedades", component: ListarnovedadesComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Administrador'] } },

  { path: "empresas", component: HabilitarEmpresaComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Administrador'] } },
  { path: "dashboard", component: DashComponent, canActivate: [IsLoggedInGuard, TieneRolGuard], data: { roles: ['Administrador'] } },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
