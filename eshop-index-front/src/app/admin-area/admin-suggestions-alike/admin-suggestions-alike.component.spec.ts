import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSuggestionsAlikeComponent } from './admin-suggestions-alike.component';

describe('AdminSuggestionsAlikeComponent', () => {
  let component: AdminSuggestionsAlikeComponent;
  let fixture: ComponentFixture<AdminSuggestionsAlikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSuggestionsAlikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSuggestionsAlikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
