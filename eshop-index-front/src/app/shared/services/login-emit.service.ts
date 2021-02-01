
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';


@Injectable()
export class LoginEmitService {
  private loginStatus = true;
  private adminStatus = true;

  // Observable sources
  private readonly emitLoginChangeStatus = new Subject<boolean>();
  private readonly emitAdminChangeStatus = new Subject<boolean>();

  // Observable streams
  public readonly changeEmittedLogin$ = this.emitLoginChangeStatus.asObservable();
  public readonly changeEmittedAdmin$ = this.emitAdminChangeStatus.asObservable();

  // Service message commands
  public emitChangeLogin(change: boolean) {
    this.emitLoginChangeStatus.next(change);
    this.loginStatus = change;
  }

  public emitChangeAdmin(change: boolean) {
    this.emitAdminChangeStatus.next(change);
    this.adminStatus = change;
  }

  // Current status
  public checkCurrentStatusLogin(): boolean {
    return this.loginStatus;
  }

  public checkCurrentStatusAdmin(): boolean {
    return this.adminStatus;
  }
}
