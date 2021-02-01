import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRegistrationActivateComponent } from './account-registration-activate.component';

describe('AccountRegistrationActivateComponent', () => {
  let component: AccountRegistrationActivateComponent;
  let fixture: ComponentFixture<AccountRegistrationActivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRegistrationActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRegistrationActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
