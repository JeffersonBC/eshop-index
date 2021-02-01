import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameVoteTagComponent } from './game-vote-tag.component';

describe('GameVoteTagComponent', () => {
  let component: GameVoteTagComponent;
  let fixture: ComponentFixture<GameVoteTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameVoteTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameVoteTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
