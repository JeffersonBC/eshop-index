import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFeedComponent } from './account-feed.component';

describe('AccountFeedComponent', () => {
  let component: AccountFeedComponent;
  let fixture: ComponentFixture<AccountFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
