import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-oferta',
  templateUrl: './editar-oferta.component.html',
  styleUrls: ['./editar-oferta.component.css']
})
export class EditarOfertaComponent implements OnInit {

  visible: boolean | undefined;

  areas = [
    "Administración - Secretariado", "Agroindustria", "Alimentos", "Arquitectura - Paisajismo", "Arte - Cultura", "Atención al Cliente", "Automotriz", "Banca - Servicios Financieros", "Cadetería - Cobranzas", "Comercio - Maercado - Ventas", "Comunicación", "Construcción", "Contabilidad - Auditoría - Finanzas", "Deporte - Recreación", "Directivos - Ejecutivos", "Diseño - Decoración", "Distribución - Logística - Almacenamiento", "Eduación - Docencia", "Estética", "Eventos", "Especializaciones", "Gastronomía", "Industria - Producción", "Ingeniería", "Inmobiliario", "Importación - Exportación", "Mantenimiento general", "Mecánica", "Comunicación - Marketing - Publicidad", "Oficios - Servicios Varios", "Pasantías", "Recursos Humanos", "Salud", "Sector Legal/Jurídico", "Seguridad / Vigilancia", "Supermercados - Autoservices", "Tecnologías de la Información", "Trabajo telefónico - Call Center", "Transporte", "Turismo - Hotelería", "Otro"
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getNombre(): void {
    this.visible = !this.visible;
  }
}