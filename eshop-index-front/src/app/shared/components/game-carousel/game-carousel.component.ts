import { Component, ViewChild, Input } from '@angular/core';

import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';

import { GameModel } from '@models';


@Component({
  selector: 'app-game-carousel',
  templateUrl: './game-carousel.component.html',
  styleUrls: ['./game-carousel.component.scss']
})
export class GameCarouselComponent {

  private _games: GameModel[];
  public index = 0;

  @Input() emptyMessage: string;
  @Input() analyticsCategory = 'Game Card';

  @ViewChild('swiperContainer', {read: SwiperDirective}) directiveRef: SwiperDirective;

  get games(): GameModel[] { return this._games; }

  @Input() set games(games: GameModel[]) {
    this._games = games;
    if (this.directiveRef) { this.directiveRef.update(); }
  }


  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    width: 276,
    // loop: true,
    preloadImages: false,
    // loopAdditionalSlides: 5,
    // mousewheel: true,
    navigation: true,
  };

}
