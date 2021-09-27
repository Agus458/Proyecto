import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './middlewares/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { RegistarseComponent } from './components/registarse/registarse.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarButtonsComponent } from './components/navbar/navbar-buttons/navbar-buttons.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DatosPostulanteComponent } from './components/datos-postulante/datos-postulante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { DatosPersonalesFormComponent } from './components/datos-postulante/forms/datos-personales-form/datos-personales-form.component';
import { EducacionFormacionFormComponent } from './components/datos-postulante/forms/educacion-formacion-form/educacion-formacion-form.component';
import { ExperienciasLaboralesFormComponent } from './components/datos-postulante/forms/experiencias-laborales-form/experiencias-laborales-form.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

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
    MatMomentDateModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
