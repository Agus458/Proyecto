import { TestBed } from '@angular/core/testing';

import { NovedadesServicesService } from './novedades-services.service';

describe('NovedadesServicesService', () => {
  let service: NovedadesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovedadesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
