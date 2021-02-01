import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGamesMediaFormComponent } from './admin-games-media-form.component';

describe('AdminGamesMediaFormComponent', () => {
  let component: AdminGamesMediaFormComponent;
  let fixture: ComponentFixture<AdminGamesMediaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGamesMediaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGamesMediaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
