import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

// Material
import { MaterialModule } from './modules/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

// Custom Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { RegistarseComponent } from './components/registarse/registarse.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarButtonsComponent } from './components/navbar/navbar-buttons/navbar-buttons.component';
import { DatosPostulanteComponent } from './components/datos-postulante/datos-postulante.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { DatosPersonalesFormComponent } from './components/datos-postulante/forms/datos-personales-form/datos-personales-form.component';
import { EducacionFormacionFormComponent } from './components/datos-postulante/forms/educacion-formacion-form/educacion-formacion-form.component';
import { ExperienciasLaboralesFormComponent } from './components/datos-postulante/forms/experiencias-laborales-form/experiencias-laborales-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PermisosFormComponent } from './components/datos-postulante/forms/permisos-form/permisos-form.component';
import { PreferenciasLaboralesFormComponent } from './components/datos-postulante/forms/preferencias-laborales-form/preferencias-laborales-form.component';
import { CVFormComponent } from './components/datos-postulante/forms/cvform/cvform.component';
import { PostularseComponent } from './components/postularse/postularse.component';
import { CarruselComponent } from './components/inicio/carrusel/carrusel.component';

// Interceptors
import { AuthInterceptor } from './middlewares/auth.interceptor';

// Pipes
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { RestablecerContraseniaComponent } from './components/contrasenia/restablecer-contrasenia/restablecer-contrasenia.component';
import { CambiarContraseniaComponent } from './components/contrasenia/cambiar-contrasenia/cambiar-contrasenia.component';
import { SolicitarEmpresaComponent } from './components/usuarioempresa/solicitar-empresa/solicitar-empresa.component';
import { ConfirmarEmpresaComponent } from './components/usuarioempresa/confirmar-empresa/confirmar-empresa.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { ListarnovedadesComponent } from './components/novedades/admin/listarnovedades/listarnovedades.component';
import { AgregarnovedadesComponent } from './components/novedades/admin/agregarnovedades/agregarnovedades.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
import { EmpresaComponent } from './components/ofertas/empresa/empresa.component';
import { UsuarioempresaComponent } from './components/usuarioempresa/usuarioempresa.component';
import { MisofertasempresaComponent } from './components/ofertas/empresa/misofertasempresa/misofertasempresa.component';
import { DialogofertaComponent } from './components/ofertas/empresa/misofertasempresa/dialogoferta/dialogoferta.component';
import { EditarOfertaComponent } from './components/ofertas/empresa/editar-oferta/editar-oferta.component';
import { ListaPostulantesComponent } from './components/ofertas/empresa/lista-postulantes/lista-postulantes.component';
import { HabilitarEmpresaComponent } from './components/empresa/habilitar-empresa/habilitar-empresa.component';
import { DialogHabilitarEmpresaComponent } from './components/empresa/habilitar-empresa/dialog-habilitar-empresa/dialog-habilitar-empresa.component';
import { CompartirNovedadDialogComponent } from './components/novedades/compartir-novedad-dialog/compartir-novedad-dialog.component';
import { VistaNovedadComponent } from './components/novedades/vista-novedad/vista-novedad.component';
import { FiltrosdialogComponent } from './components/ofertas/empresa/lista-postulantes/filtrosdialog/filtrosdialog.component';
import { ChartsModule } from 'ng2-charts';
import { DashComponent } from './components/dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { CardComponent } from './components/dash/card/card.component';
import { LineChartComponent } from './components/dash/charts/line-chart/line-chart.component';
import { FiltersEmpresaDialogComponent } from './components/empresa/filters-empresa-dialog/filters-empresa-dialog.component';
import { PostulacionesComponent } from './components/postulaciones/postulaciones.component';
import { PortalofertasComponent } from './components/ofertas/postulante/portalofertas/portalofertas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    IniciarSesionComponent,
    RegistarseComponent,
    InicioComponent,
    NavbarButtonsComponent,
    DatosPostulanteComponent,
    MiPerfilComponent,
    DatosPersonalesFormComponent,
    EducacionFormacionFormComponent,
    ExperienciasLaboralesFormComponent,
    SafeUrlPipe,
    PageNotFoundComponent,
    PermisosFormComponent,
    PreferenciasLaboralesFormComponent,
    CVFormComponent,
    PostularseComponent,
    CarruselComponent,
    RestablecerContraseniaComponent,
    CambiarContraseniaComponent,
    SolicitarEmpresaComponent,
    ConfirmarEmpresaComponent,
    NovedadesComponent,
    ListarnovedadesComponent,
    AgregarnovedadesComponent,
    OfertasComponent,
    EmpresaComponent,
    UsuarioempresaComponent,
    MisofertasempresaComponent,
    DialogofertaComponent,
    EditarOfertaComponent,
    ListaPostulantesComponent,
    HabilitarEmpresaComponent,
    DialogHabilitarEmpresaComponent,
    ListaPostulantesComponent,
    CompartirNovedadDialogComponent,
    VistaNovedadComponent,
    FiltrosdialogComponent,
    LineChartComponent,
    DashComponent,
    CardComponent,
    FiltersEmpresaDialogComponent,
    PostulacionesComponent,
    PortalofertasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    IvyCarouselModule,
    SocialLoginModule,
    ChartsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '244141692287-hl83d4kgth784p6cc85icoq37d5bproa.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              'clientId'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
