import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTagsMergeComponent } from './admin-tags-merge.component';

describe('AdminTagsMergeComponent', () => {
  let component: AdminTagsMergeComponent;
  let fixture: ComponentFixture<AdminTagsMergeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTagsMergeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTagsMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
