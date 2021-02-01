import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { GameMedia } from '@models';
import { FormUtil } from '@shared/utils/form.util';
import { GameMediaService } from '@services/game-media.service';


@Component({
  selector: 'app-admin-games-media-form',
  templateUrl: './admin-games-media-form.component.html',
})
export class AdminGamesMediaFormComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  gameId: number;
  mediaId: number;

  isEditing = false;
  formInfo: GameMedia = {} as GameMedia;

  constructor(
    private readonly gameMediaService: GameMediaService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];

    if (this.route.snapshot.params['id']) {
      this.mediaId = this.route.snapshot.params['id'];
      this.formInfo = this.route.snapshot.data['gameMedia'];
      this.isEditing = true;
    }
  }

  isValid(): boolean {
    FormUtil.touchForm(this.form.control);
    return this.form.valid;
  }

  send() {
    if (!this.isValid()) { return; }

    if (this.isEditing) {
      this.gameMediaService.patchGameMedia(this.formInfo, this.mediaId)
        .subscribe( () => this.router.navigate(['admin', 'games', this.gameId, 'media']) );

    } else {
      this.gameMediaService.postGameMedia(this.formInfo, this.gameId)
        .subscribe( () => this.router.navigate(['admin', 'games', this.gameId, 'media']) );
    }
  }

  delete() {
    if (confirm('Are you SURE you want to delete this media?')) {
      this.gameMediaService.deleteGameMedia(this.mediaId)
        .subscribe( () => this.router.navigate(['admin', 'games', this.gameId, 'media']) );
    }
  }
}
