import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileRecomendationsComponent } from './user-profile-recomendations.component';

describe('UserProfileRecomendationsComponent', () => {
  let component: UserProfileRecomendationsComponent;
  let fixture: ComponentFixture<UserProfileRecomendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileRecomendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileRecomendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
