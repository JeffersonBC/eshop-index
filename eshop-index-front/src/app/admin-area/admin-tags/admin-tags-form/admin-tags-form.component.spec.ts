import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTagsFormComponent } from './admin-tags-form.component';

describe('AdminTagsFormComponent', () => {
  let component: AdminTagsFormComponent;
  let fixture: ComponentFixture<AdminTagsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTagsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTagsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
