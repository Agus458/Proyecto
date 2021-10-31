import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AdministradorService } from 'src/app/services/administrador/administrador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
        };
      }

      return {
        columns: 6,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 3, rows: 2 },
      };
    })
  );

  data: any[] = [];
  dashboardForm: FormGroup;

  charts: any[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private administradorService: AdministradorService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.administradorService.charts().subscribe(
      result => {
        Object.keys(result).forEach(key => {
          this.charts.push({ name: key, data: result[key] });
        });

        console.log(this.charts);

      }
    );

    this.dashboardForm = this.formBuilder.group({
      desde: ["", Validators.required],
      hasta: ["", Validators.required]
    });

    this.administradorService.dashboard().subscribe(
      result => {
        Object.keys(result).forEach(key => {
          this.data.push({ name: key, cant: result[key] });
        });
      }
    )
  }

  submit() {
    const { desde, hasta } = this.dashboardForm.value;
    this.data = [];
    this.administradorService.dashboard(desde, hasta).subscribe(
      result => {
        Object.keys(result).forEach(key => {
          this.data.push({ name: key, cant: result[key] });
        });
      }
    )
  }

  clear() {
    this.dashboardForm.reset();
    this.data = [];
    this.administradorService.dashboard().subscribe(
      result => {
        Object.keys(result).forEach(key => {
          this.data.push({ name: key, cant: result[key] });
        });
      }
    )
  }

}
