import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSuggestionsTagsComponent } from './admin-suggestions-tags.component';

describe('AdminSuggestionsTagsComponent', () => {
  let component: AdminSuggestionsTagsComponent;
  let fixture: ComponentFixture<AdminSuggestionsTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSuggestionsTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSuggestionsTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
