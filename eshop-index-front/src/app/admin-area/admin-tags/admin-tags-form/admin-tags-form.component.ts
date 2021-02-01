import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TagGroupModel, TagModel } from '@models';
import { TagService } from '@services/classification/tag.service';
import { FormUtil } from '@shared/utils/form.util';


@Component({
  selector: 'app-admin-tags-form',
  templateUrl: './admin-tags-form.component.html',
  styleUrls: [],
})
export class AdminTagsFormComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  readonly formInfo: TagModel = {
    name: '',
    group: {} as TagGroupModel,
  };

  isEditing = false;
  tagGroups: TagGroupModel[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly tagService: TagService,
  ) { }

  ngOnInit() {
    this.tagService.getTagGroupsAll().subscribe(
      (response: TagGroupModel[]) => this.tagGroups = response,
    );

    if (this.route.snapshot.data['tag']) {
      const data = this.route.snapshot.data['tag'] as TagModel;

      this.formInfo.name = data.name;
      this.formInfo.group = data.group;
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
        ? this.tagService.updateTag(
            this.formInfo.name,
            this.formInfo.group.id.toString(),
            this.route.snapshot.params['id'],
          ).subscribe(
            () => this.router.navigate(['admin', 'tags']))

        : this.tagService.postTag(
          this.formInfo.name,
          this.formInfo.group.id.toString(),
          ).subscribe(
            () => this.router.navigate(['admin', 'tags']));
    }
  }

  delete() {
    if (confirm('Are you sure you want to DELETE this tag?')) {
      this.tagService.deleteTag(this.route.snapshot.params['id'])
        .subscribe( () => this.router.navigate(['admin', 'tags']) );
    }
  }
}
