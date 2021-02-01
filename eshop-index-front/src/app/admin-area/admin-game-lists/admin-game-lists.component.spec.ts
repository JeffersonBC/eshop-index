import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGameListsComponent } from './admin-game-lists.component';

describe('AdminGameListsComponent', () => {
  let component: AdminGameListsComponent;
  let fixture: ComponentFixture<AdminGameListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGameListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGameListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
