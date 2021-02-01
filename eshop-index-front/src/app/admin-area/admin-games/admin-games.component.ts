import { Component, OnInit, Input } from '@angular/core';

import { GameService } from '@services/game.service';
import { GameAdminTableModel } from '@models';
import { RecomendationService } from '@services/classification/recomendation.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-admin-games',
  templateUrl: './admin-games.component.html',
  styleUrls: [
    './admin-games.component.scss',
    '../../shared/style/_admin-table.scss',
  ]
})
export class AdminGamesComponent implements OnInit {

  @Input() gamesPerPage = 30;

  games: GameAdminTableModel[] = [];

  filterText = '';
  filteredGames: GameAdminTableModel[] = [];

  gamesCurrentPage: GameAdminTableModel[] = [];
  currentPage = 1;
  pages: number[] = [];

  _loading = false;

  constructor(
    private readonly gameService: GameService,
    private readonly recomendationService: RecomendationService,
  ) { }

  ngOnInit() {
    this.gameService.getGamesAdminAll().subscribe(
      (response: any[]) => {
        this.games = response;
        this.filteredGames = this.games;
        this.initialize();
      });
  }

  initialize() {
    this.gamesCurrentPage = this.filteredGames.slice(0, this.gamesPerPage);
    this.currentPage = 1;

    this.pages = [];
    for (let i = 1; i <= (this.filteredGames.length / this.gamesPerPage) + 1; i++) {
      this.pages.push(i);
    }
  }

  filter() {
    if (this.filterText === '') {
      this.filteredGames = this.games;
      this.initialize();

    } else {
      this.filteredGames = this.games.filter(
        game => game.title.toLowerCase().includes(this.filterText.toLowerCase())
      );

      this.initialize();
    }
  }

  highlight(gameId: number) {
    if (this._loading) { return; }

    const game = this.games.find(g => g.id == gameId);
    this._loading = true;

    if (game.highlighted) {
      this.recomendationService.deleteRecomendationHighlightAdmin(gameId)
        .pipe(finalize( () => this._loading = false) )
        .subscribe( () => game.highlighted = false );

    } else {
      this.recomendationService.postRecomendationHighlightAdmin(gameId)
        .pipe(finalize( () => this._loading = false ))
        .subscribe( () => game.highlighted = true );
    }
  }

  hide(gameId: number) {
    if (this._loading) { return; }

    const game = this.games.find(g => g.id == gameId);
    this._loading = true;

    if (game.hide) {
      this.gameService.deleteGameHide(gameId)
        .pipe(finalize( () => this._loading = false) )
        .subscribe( () => game.hide = false );

    } else {
      this.gameService.postGameHide(gameId)
        .pipe(finalize( () => this._loading = false ))
        .subscribe( () => game.hide = true );
    }
  }

  goToPage(pageNumber: number) {
    if (pageNumber <= 0 || pageNumber > this.pages.length) { return; }

    this.currentPage = pageNumber;
    this.gamesCurrentPage = this.filteredGames.slice(
      (pageNumber - 1) * this.gamesPerPage,
      (pageNumber - 1) * this.gamesPerPage + this.gamesPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.goToPage(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.goToPage(this.currentPage);
    }
  }

}
