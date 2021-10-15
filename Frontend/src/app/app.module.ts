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
import { NuevaOfertaComponent } from './components/nueva-oferta/nueva-oferta.component';
import { PostularseComponent } from './components/postularse/postularse.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';

// Interceptors
import { AuthInterceptor } from './middlewares/auth.interceptor';

// Pipes
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { RestablecerContraseniaComponent } from './components/restablecer-contrasenia/restablecer-contrasenia.component';
import { CambiarContraseniaComponent } from './components/cambiar-contrasenia/cambiar-contrasenia.component';
import { SolicitarEmpresaComponent } from './components/solicitar-empresa/solicitar-empresa.component';
import { ConfirmarEmpresaComponent } from './components/confirmar-empresa/confirmar-empresa.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { ListarnovedadesComponent } from './components/novedades/admin/listarnovedades/listarnovedades.component';
import { AgregarnovedadesComponent } from './components/novedades/admin/agregarnovedades/agregarnovedades.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
import { NuevaofertaComponent } from './components/ofertas/nuevaoferta/nuevaoferta.component';

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
    NuevaOfertaComponent,
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
    NuevaofertaComponent,
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
    SocialLoginModule
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
