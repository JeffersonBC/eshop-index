import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGamesMergeComponent } from './admin-games-merge.component';

describe('AdminGamesMergeComponent', () => {
  let component: AdminGamesMergeComponent;
  let fixture: ComponentFixture<AdminGamesMergeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGamesMergeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGamesMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
