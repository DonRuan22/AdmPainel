import { TestBed } from '@angular/core/testing';

import { GoogleDrivePickerService } from './google-drive-service.service';

describe('GoogleDrivePickerServiceService', () => {
  let service: GoogleDrivePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleDrivePickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
