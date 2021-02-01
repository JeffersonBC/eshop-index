import { Component, Input, OnChanges } from '@angular/core';
import { GameModel } from '@models';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnChanges {

  @Input() games: GameModel[];
  @Input() analyticsCategory = 'Game Card';
  @Input() emptyMessage = 'No games in this list.';

  pages: number[] = [];
  gamesCurrentPage: GameModel[];
  currentPage = 0;
  gamesPerPage = 16;

  ngOnChanges() {
    if (this.games) {
      this.gamesCurrentPage = this.games.slice(0, this.gamesPerPage);
      this.currentPage = 1;

      this.pages = [];
      for (let i = 1; i <= ((this.games.length - 1) / this.gamesPerPage) + 1; i++) {
        this.pages.push(i);
      }
    }
  }

  goToPage(pageNumber: number) {
    if (pageNumber <= 0 || pageNumber > this.pages.length) { return; }

    this.currentPage = pageNumber;
    this.gamesCurrentPage = this.games.slice(
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
