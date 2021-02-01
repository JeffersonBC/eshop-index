import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameReviewsAllComponent } from './game-reviews-all.component';

describe('GameReviewsAllComponent', () => {
  let component: GameReviewsAllComponent;
  let fixture: ComponentFixture<GameReviewsAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameReviewsAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameReviewsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
