import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {AngularFireAuth} from "@angular/fire/auth";
import {MockAngularFireAuth} from "../../../stubs/objects.stub";

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFireAuth, useValue: MockAngularFireAuth}]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
