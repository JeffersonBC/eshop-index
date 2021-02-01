import { Component, OnInit } from '@angular/core';
import { TagGroupModel } from '@models';
import { TagService } from '@services/classification/tag.service';


@Component({
  selector: 'app-admin-tag-groups',
  templateUrl: './admin-tag-groups.component.html',
  styleUrls: ['../../shared/style/_admin-table.scss']
})
export class AdminTagGroupsComponent implements OnInit {

  tagGroups: TagGroupModel[] = [];


  constructor(
    private readonly tagService: TagService,
  ) { }

  ngOnInit() {
    this.tagService.getTagGroupsAll().subscribe(
      (response: TagGroupModel[]) => this.tagGroups = response
    );
  }

}
