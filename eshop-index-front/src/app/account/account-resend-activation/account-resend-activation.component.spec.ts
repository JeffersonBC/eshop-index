import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountResendActivationComponent } from './account-resend-activation.component';

describe('AccountResendActivationComponent', () => {
  let component: AccountResendActivationComponent;
  let fixture: ComponentFixture<AccountResendActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountResendActivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountResendActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
