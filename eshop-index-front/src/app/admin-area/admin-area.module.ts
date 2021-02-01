import { MaterializeModule } from 'angular2-materialize';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { AdminAreaRoutingModule } from './admin-area-routing.module';

import { AdminAreaComponent } from './admin-area.component';

import { AdminTagGroupsComponent } from './admin-tag-groups/admin-tag-groups.component';
import { AdminTagGroupsFormComponent } from './admin-tag-groups/adming-tag-groups-form/admin-tag-groups-form.component';

import { AdminTagsComponent } from './admin-tags/admin-tags.component';
import { AdminTagsFormComponent } from './admin-tags/admin-tags-form/admin-tags-form.component';

import { AdminGamesComponent } from './admin-games/admin-games.component';
import { AdminGamesFormComponent } from './admin-games/admin-games-form/admin-games-form.component';
import { AdminGamesTagsComponent } from './admin-games/admin-games-tags/admin-games-tags.component';
import { AdminGamesSimilarComponent } from './admin-games/admin-games-similar/admin-games-similar.component';
import { AdminGamesMergeComponent } from './admin-games/admin-games-merge/admin-games-merge.component';
import { AdminTagsMergeComponent } from './admin-tags/admin-tags-merge/admin-tags-merge.component';
import { AdminGameListsComponent } from './admin-game-lists/admin-game-lists.component';
import { AdminGameListsFormComponent } from './admin-game-lists/admin-game-lists-form/admin-game-lists-form.component';

import { AdminGamesMediaFormComponent } from './admin-games/admin-games-media/admin-games-media-form/admin-games-media-form.component';
import { AdminGamesMediaComponent } from './admin-games/admin-games-media/admin-games-media.component';
import { AdminSuggestionsTagsComponent } from './admin-suggestions-tags/admin-suggestions-tags.component';
import { AdminSuggestionsAlikeComponent } from './admin-suggestions-alike/admin-suggestions-alike.component';


@NgModule({
  imports: [
    MaterializeModule,

    CommonModule,
    RouterModule,
    FormsModule,

    AdminAreaRoutingModule,
    SharedModule,
  ],
  declarations: [
    AdminAreaComponent,

    AdminGameListsComponent,
    AdminGameListsFormComponent,

    AdminGamesComponent,
    AdminGamesFormComponent,
    AdminGamesMergeComponent,
    AdminGamesSimilarComponent,
    AdminGamesTagsComponent,

    AdminGamesMediaComponent,
    AdminGamesMediaFormComponent,

    AdminTagGroupsComponent,
    AdminTagGroupsFormComponent,

    AdminTagsComponent,
    AdminTagsFormComponent,
    AdminTagsMergeComponent,
    AdminSuggestionsTagsComponent,
    AdminSuggestionsAlikeComponent,
  ],
})
export class AdminAreaModule { }
