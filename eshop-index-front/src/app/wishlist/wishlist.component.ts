import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { GameModel } from '@models';
import { WishlistService } from '@services/classification/wishlist.service';
import { GameService } from '@services/game.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  games$: Observable<GameModel[]>;
  games: GameModel[];

  constructor(
    private readonly gameService: GameService,
    private readonly wishlistService: WishlistService,
  ) { }

  ngOnInit() {
    this.wishlistService.getWishlist().subscribe( response => this.games = response );

    this.gameService.emitCountryChange$.subscribe( () => {
      this.wishlistService.getWishlist().subscribe( response => this.games = response );
    });
  }

}
