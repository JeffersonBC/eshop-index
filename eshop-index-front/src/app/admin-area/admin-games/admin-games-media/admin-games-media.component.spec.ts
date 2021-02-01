import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGamesMediaComponent } from './admin-games-media.component';

describe('AdminGamesMediaComponent', () => {
  let component: AdminGamesMediaComponent;
  let fixture: ComponentFixture<AdminGamesMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGamesMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGamesMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
