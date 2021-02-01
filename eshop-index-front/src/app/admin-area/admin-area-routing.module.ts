import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '@guards/admin.guard';
import { GameListResolver } from '@resolvers/game-list.resolver';
import { GameMediaResolver } from '@resolvers/game-media.resolver';
import { TagResolver } from '@resolvers/tag.resolver';
import { TagGroupResolver } from '@resolvers/tag-group.resolver';

import { AdminAreaComponent } from './admin-area.component';

import { AdminGamesComponent } from './admin-games/admin-games.component';
import { AdminGamesFormComponent } from './admin-games/admin-games-form/admin-games-form.component';
import { AdminGamesMergeComponent } from './admin-games/admin-games-merge/admin-games-merge.component';
import { AdminGamesSimilarComponent } from './admin-games/admin-games-similar/admin-games-similar.component';
import { AdminGamesTagsComponent } from './admin-games/admin-games-tags/admin-games-tags.component';

import { AdminGamesMediaComponent } from './admin-games/admin-games-media/admin-games-media.component';
import { AdminGamesMediaFormComponent } from './admin-games/admin-games-media/admin-games-media-form/admin-games-media-form.component';

import { AdminGameListsComponent } from './admin-game-lists/admin-game-lists.component';
import { AdminGameListsFormComponent } from './admin-game-lists/admin-game-lists-form/admin-game-lists-form.component';

import { AdminTagGroupsComponent } from './admin-tag-groups/admin-tag-groups.component';
import { AdminTagGroupsFormComponent } from './admin-tag-groups/adming-tag-groups-form/admin-tag-groups-form.component';

import { AdminTagsComponent } from './admin-tags/admin-tags.component';
import { AdminTagsFormComponent } from './admin-tags/admin-tags-form/admin-tags-form.component';
import { AdminTagsMergeComponent } from './admin-tags/admin-tags-merge/admin-tags-merge.component';

import { AdminSuggestionsTagsComponent } from './admin-suggestions-tags/admin-suggestions-tags.component';
import { AdminSuggestionsAlikeComponent } from './admin-suggestions-alike/admin-suggestions-alike.component';


const appRoutes: Routes = [
  { path: '', component: AdminAreaComponent,
    canActivate: [ AdminGuard ], canLoad: [ AdminGuard ],
    children: [
      { path: 'games', component: AdminGamesComponent },
      { path: 'games/add', component: AdminGamesFormComponent },
      { path: 'games/edit/:id', component: AdminGamesFormComponent },
      { path: 'games/merge/:id', component: AdminGamesMergeComponent },
      { path: 'games/similar/:id', component: AdminGamesSimilarComponent },
      { path: 'games/tags/:id', component: AdminGamesTagsComponent },

      { path: 'games/:gameId/media', component: AdminGamesMediaComponent },
      { path: 'games/:gameId/media/add', component: AdminGamesMediaFormComponent },
      { path: 'games/:gameId/media/edit/:id', component: AdminGamesMediaFormComponent,
        resolve: { gameMedia: GameMediaResolver } },

      { path: 'game_lists', component: AdminGameListsComponent },
      { path: 'game_lists/:slotId/add', component: AdminGameListsFormComponent },
      { path: 'game_lists/:slotId/edit/:id', component: AdminGameListsFormComponent,
        resolve: { gameList: GameListResolver } },

      { path: 'tags', component: AdminTagsComponent },
      { path: 'tags/add', component: AdminTagsFormComponent },
      { path: 'tags/edit/:id', component: AdminTagsFormComponent,
        resolve: { tag: TagResolver }},
      { path: 'tags/merge/:id', component: AdminTagsMergeComponent },

      { path: 'tag_groups', component: AdminTagGroupsComponent },
      { path: 'tag_groups/add', component: AdminTagGroupsFormComponent },
      { path: 'tag_groups/edit/:id', component: AdminTagGroupsFormComponent,
        resolve: { tagGroup: TagGroupResolver }},

      { path: 'suggestions/tags', component: AdminSuggestionsTagsComponent },
      { path: 'suggestions/similar', component: AdminSuggestionsAlikeComponent },
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class AdminAreaRoutingModule { }
