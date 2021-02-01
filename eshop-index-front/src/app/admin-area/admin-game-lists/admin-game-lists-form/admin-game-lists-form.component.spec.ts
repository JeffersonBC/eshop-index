import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGameListsFormComponent } from './admin-game-lists-form.component';

describe('AdminGameListsFormComponent', () => {
  let component: AdminGameListsFormComponent;
  let fixture: ComponentFixture<AdminGameListsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGameListsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGameListsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
