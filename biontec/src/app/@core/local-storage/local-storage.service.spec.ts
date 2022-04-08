import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { beforeEach, describe, expect, it } from '@angular/core/testing/src/testing_internal';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
  });

  it('should be created', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));
});
