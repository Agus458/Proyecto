import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { DialogHabilitarEmpresaComponent } from './dialog-habilitar-empresa/dialog-habilitar-empresa.component';

@Component({
  selector: 'app-habilitar-empresa',
  templateUrl: './habilitar-empresa.component.html',
  styleUrls: ['./habilitar-empresa.component.css']
})
export class HabilitarEmpresaComponent implements OnInit {

  empresas: Empresa[] = []

  displayedColumns: string[] = ['id', 'rut', 'razonSocial', 'mas'];

  constructor(
    private empresasService: EmpresasService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.empresasService.getPendientes().subscribe(
      ok => {
        this.empresas = ok;
      }
    );
  }

  openDialog(empresa: Empresa){
    this.dialog.open(DialogHabilitarEmpresaComponent, {
      data: empresa
    });
  }
}
