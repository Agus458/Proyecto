import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { FiltersEmpresaDialogComponent } from '../filters-empresa-dialog/filters-empresa-dialog.component';
import { DialogHabilitarEmpresaComponent } from './dialog-habilitar-empresa/dialog-habilitar-empresa.component';

@Component({
  selector: 'app-habilitar-empresa',
  templateUrl: './habilitar-empresa.component.html',
  styleUrls: ['./habilitar-empresa.component.css']
})
export class HabilitarEmpresaComponent implements OnInit {

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  filtros: any;

  empresas: Empresa[] = []

  displayedColumns: string[] = ['id', 'rut', 'razonSocial', 'estado', 'mas'];

  constructor(
    private empresasService: EmpresasService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getEmpresas(0, this.pageSize);
  }

  getEmpresas(skip: number, take: number, filters?: any) {
    this.empresasService.getEmpresas(skip, take, filters).subscribe(
      ok => {
        this.empresas = ok.data;
        this.length = ok.cantidad;
      }
    );
  }

  openDialog(empresa: Empresa){
    this.dialog.open(DialogHabilitarEmpresaComponent, {
      data: empresa
    });
  }

  openDialogFilters() {
    const dialogRef = this.dialog.open(FiltersEmpresaDialogComponent, {
      data: this.filtros
    });

    dialogRef.afterClosed().subscribe(result => {
      this.filtros = result;
      this.getEmpresas(0, this.pageSize, this.filtros);
    });

  }

  getEstado(estado: number){
    if(estado == 0) return "Activa";
    else if (estado == 1) return "Inactiva";
    else return "Pendiente";
  }

  paginatorChange(event?: PageEvent) {
    if (event) {
      const skip = event.pageIndex * event.pageSize;
      this.getEmpresas(skip, event.pageSize, this.filtros);
    }
  }
}
