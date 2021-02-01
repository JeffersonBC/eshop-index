import { Component, EventEmitter, OnInit } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { GameService } from '@services/game.service';


@Component({
  selector: 'app-app-root-country-modal',
  templateUrl: './app-root-country-modal.component.html',
  styleUrls: ['./app-root-country-modal.component.scss'],
})
export class AppRootCountryModalComponent implements OnInit {

  public selectedCounty = null;

  public modalActions = new EventEmitter< string | MaterializeAction >();
  public modalParams = [{ dismissible: false }];

  countries = [
    // { value: 'AR', label: 'Argentina' },
    // { value: 'BR', label: 'Brazil' },
    { value: 'CA', label: 'Canada' },
    // { value: 'CL', label: 'Chile' },
    { value: 'FR', label: 'France' },
    { value: 'DE', label: 'Germany' },
    { value: 'MX', label: 'Mexico' },
    { value: 'RU', label: 'Russia' },
    { value: 'ZA', label: 'South Africa' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'US', label: 'United States of America' },
  ];


  constructor(
    private readonly gameService: GameService,
  ) { }

  ngOnInit() {
    this.selectedCounty = this.gameService.country;
  }


  public openModal() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }

  public closeModal() {
    this.gameService.country = this.selectedCounty;
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }

}
