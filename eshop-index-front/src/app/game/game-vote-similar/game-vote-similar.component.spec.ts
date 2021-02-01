import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameVoteSimilarComponent } from './game-vote-similar.component';

describe('GameVoteSimilarComponent', () => {
  let component: GameVoteSimilarComponent;
  let fixture: ComponentFixture<GameVoteSimilarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameVoteSimilarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameVoteSimilarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
