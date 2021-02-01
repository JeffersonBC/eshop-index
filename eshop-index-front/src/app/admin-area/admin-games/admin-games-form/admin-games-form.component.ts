import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-games-form',
  templateUrl: './admin-games-form.component.html',
  styleUrls: ['./admin-games-form.component.scss']
})
export class AdminGamesFormComponent implements OnInit {

  isEditing = false;

  readonly formInfo = {
    title: '',
    gameCode: '',

    releaseUs: '',
    boxartUsUrl: '',

    releaseEu: '',
    boxartEuSquareUrl: '',
    boxartEuSquareSmallUrl: '',
    boxartEuLargeUrl: '',
  };

  constructor() { }

  ngOnInit() {
  }

  send() {}

}
