import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministradorService } from 'src/app/services/administrador/administrador.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any;
  dashboardForm: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private AdministradorService: AdministradorService
  ) { }

  ngOnInit(): void {
    this.dashboardForm = this.FormBuilder.group({
      desde: ["", Validators.required],
      hasta: ["", Validators.required]
    });

    this.AdministradorService.dashboard().subscribe(
      ok => {
        this.data = ok;
      }
    )
  }

  submit() {
    const { desde, hasta } = this.dashboardForm.value;

    this.AdministradorService.dashboard(desde, hasta).subscribe(
      ok => {
        this.data = ok;
      }
    )
  }

  clear() {
    this.dashboardForm.reset();
    this.AdministradorService.dashboard().subscribe(
      ok => {
        this.data = ok;
      }
    )
  }

}
