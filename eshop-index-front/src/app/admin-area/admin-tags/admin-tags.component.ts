import { Component, OnInit } from '@angular/core';

import { TagService } from '@services/classification/tag.service';
import { TagModel } from '@models';


@Component({
  selector: 'app-admin-tags',
  templateUrl: './admin-tags.component.html',
  styleUrls: ['../../shared/style/_admin-table.scss']
})
export class AdminTagsComponent implements OnInit {

  tags: TagModel[] = [];


  constructor(
    private readonly tagService: TagService,
  ) { }

  ngOnInit() {
    this.tagService.getTagsAll().subscribe(
      (response: TagModel[]) => this.tags = response
    );
  }
}
