import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingTagGroupsFormComponent } from './admin-tag-groups-form.component';

describe('TagGroupsFormComponent', () => {
  let component: AdmingTagGroupsFormComponent;
  let fixture: ComponentFixture<AdmingTagGroupsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmingTagGroupsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmingTagGroupsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
