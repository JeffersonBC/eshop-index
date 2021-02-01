import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountReviewFormComponent } from './account-review-form.component';

describe('AccountReviewFormComponent', () => {
  let component: AccountReviewFormComponent;
  let fixture: ComponentFixture<AccountReviewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountReviewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
