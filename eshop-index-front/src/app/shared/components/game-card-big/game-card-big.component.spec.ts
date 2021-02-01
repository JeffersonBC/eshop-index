import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardBigComponent } from './game-card-big.component';

describe('GameCardBigComponent', () => {
  let component: GameCardBigComponent;
  let fixture: ComponentFixture<GameCardBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCardBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
