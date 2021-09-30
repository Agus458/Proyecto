import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nueva-oferta',
  templateUrl: './nueva-oferta.component.html',
  styleUrls: ['./nueva-oferta.component.css']
})
export class NuevaOfertaComponent implements OnInit {

  areas = [
    "Administración - Secretariado", "Agroindustria", "Alimentos", "Arquitectura - Paisajismo", "Arte - Cultura", "Atención al Cliente", "Automotriz", "Banca - Servicios Financieros", "Cadetería - Cobranzas", "Comercio - Maercado - Ventas", "Comunicación", "Construcción", "Contabilidad - Auditoría - Finanzas", "Deporte - Recreación", "Directivos - Ejecutivos", "Diseño - Decoración", "Distribución - Logística - Almacenamiento", "Eduación - Docencia", "Estética", "Eventos", "Especializaciones", "Gastronomía", "Industria - Producción", "Ingeniería", "Inmobiliario", "Importación - Exportación", "Mantenimiento general", "Mecánica", "Comunicación - Marketing - Publicidad", "Oficios - Servicios Varios", "Pasantías", "Recursos Humanos", "Salud", "Sector Legal/Jurídico", "Seguridad / Vigilancia", "Supermercados - Autoservices", "Tecnologías de la Información", "Trabajo telefónico - Call Center", "Transporte", "Turismo - Hotelería", "Otro"
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
