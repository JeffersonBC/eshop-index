import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGamesSimilarComponent } from './admin-games-similar.component';

describe('AdminGamesSimilarComponent', () => {
  let component: AdminGamesSimilarComponent;
  let fixture: ComponentFixture<AdminGamesSimilarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGamesSimilarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGamesSimilarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
