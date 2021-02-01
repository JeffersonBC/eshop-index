import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { finalize } from 'rxjs/operators';

import { TagModel } from '@models';
import { TagService } from '@services/classification/tag.service';


@Component({
  selector: 'app-admin-tags-merge',
  templateUrl: './admin-tags-merge.component.html',
  styleUrls: [],
})
export class AdminTagsMergeComponent implements OnInit {

  tag: TagModel;

  tagsList: TagModel[];
  selectedTagId: number;
  _loading = false;


  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly tagService: TagService,
  ) { }

  ngOnInit() {
    this.tagService.getTag(this.route.snapshot.params['id'])
      .subscribe( tag => this.tag = tag );

    this.tagService.getTagsAll().subscribe( tags => this.tagsList = tags );
  }

  merge() {
    if (this._loading) { return; }

    if (confirm('Are you SURE you want to merge these two tags? This can\'t be undone.')) {
      this._loading = true;

      this.tagService.postTagMerge(this.tag.id, this.selectedTagId)
        .pipe(finalize( () => this._loading = false ))
        .subscribe( () => this.router.navigate(['/', 'admin', 'tags']) );
    }
  }
}
