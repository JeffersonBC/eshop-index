import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPasswordResetNewComponent } from './account-password-reset-new.component';

describe('AccountPasswordResetNewComponent', () => {
  let component: AccountPasswordResetNewComponent;
  let fixture: ComponentFixture<AccountPasswordResetNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPasswordResetNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPasswordResetNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
