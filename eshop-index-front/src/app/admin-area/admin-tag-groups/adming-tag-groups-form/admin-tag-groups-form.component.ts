import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TagService } from '@services/classification/tag.service';
import { FormUtil } from '@shared/utils/form.util';


@Component({
  selector: 'app-admin-tag-groups-form',
  templateUrl: './admin-tag-groups-form.component.html',
  styleUrls: [],
})
export class AdminTagGroupsFormComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  isEditing = false;

  tagGroupForm = {
    name: '',
    allowVote: true,
    minGamesForSearch: 0,
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly tagService: TagService,
  ) { }

  ngOnInit() {
    if (this.route.snapshot.data['tagGroup']) {
      this.tagGroupForm = {
        name: this.route.snapshot.data['tagGroup']['name'],
        minGamesForSearch: this.route.snapshot.data['tagGroup']['min_games_for_search'],
        allowVote: this.route.snapshot.data['tagGroup']['allow_vote'],
      };

      this.isEditing = true;
    }
  }

  isValid(): boolean {
    FormUtil.touchForm(this.form.control);
    return this.form.valid;
  }

  send() {
    if (this.isValid()) {
      this.isEditing
        ? this.tagService.updateTagGroup(
          this.tagGroupForm.name,
          this.tagGroupForm.minGamesForSearch,
          this.tagGroupForm.allowVote,
          this.route.snapshot.params['id']
        ).subscribe(
          () => this.router.navigate(['admin', 'tag_groups']))

        : this.tagService.postTagGroup(
            this.tagGroupForm.name,
            this.tagGroupForm.minGamesForSearch,
            this.tagGroupForm.allowVote,
          ).subscribe(
            () => this.router.navigate(['admin', 'tag_groups']));
    }
  }

  delete() {
    if (confirm('Are you SURE you want to delete this tag group?')) {
      this.tagService.deleteTagGroup(this.route.snapshot.params['id']).subscribe(
        () => this.router.navigate(['admin', 'tag_groups'])
      );
    }
  }

}
