import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGamesTagsComponent } from './admin-games-tags.component';

describe('AdminGamesTagsComponent', () => {
  let component: AdminGamesTagsComponent;
  let fixture: ComponentFixture<AdminGamesTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGamesTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGamesTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
