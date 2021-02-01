import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { TagsPerGroup, TagVotedModel, TagModel, SuggestedTags } from '@models';
import { Endpoints } from '@shared/utils/endpoints.util';


@Injectable()
export class TagService {

  constructor(
    private readonly http: HttpClient,
  ) { }


  // TAGS
  getTagsAllByGame(gameCode: string): Observable<TagsPerGroup> {
    return this.http.get(Endpoints.get(Endpoints.tagsAllByGame, gameCode)) as Observable<TagsPerGroup>;
  }

  getTagsAll(): Observable<TagModel[]> {
    return this.http.get(Endpoints.get(Endpoints.tagsAll)) as Observable<TagModel[]>;
  }

  getTagsAllByGroup(): Observable<TagsPerGroup> {
    return this.http.get(Endpoints.get(Endpoints.tagsAllByGroup)) as Observable<TagsPerGroup>;
  }

  getTagsAllBySearcheableGroup(): Observable<TagsPerGroup> {
    return this.http.get(Endpoints.get(Endpoints.tagsAllBySearcheableGroup)) as Observable<TagsPerGroup>;
  }

  getTagsAllByVotableGroup(): Observable<TagsPerGroup> {
    return this.http.get(Endpoints.get(Endpoints.tagsAllByVotableGroup)) as Observable<TagsPerGroup>;
  }

  getTag(id: number): Observable<TagModel> {
    return this.http.get(Endpoints.get(Endpoints.tag, id)) as Observable<TagModel>;
  }

  postTag(name: string, group_id: string) {
    return this.http.post(Endpoints.get(Endpoints.tagPost), { name, group_id });
  }

  updateTag(name: string, group_id: string, id: number) {
    return this.http.patch(Endpoints.get(Endpoints.tag, id), { name, group_id });
  }

  deleteTag(id: number) {
    return this.http.delete(Endpoints.get(Endpoints.tag, id));
  }

  postTagMerge(tag1Id: number, tag2Id: number) {
    return this.http.post(Endpoints.get(Endpoints.tagMerge, tag1Id, tag2Id), null);
  }


  // TAG GROUPS
  getTagGroupsAll() {
    return this.http.get(Endpoints.get(Endpoints.tagGroupsAll));
  }

  getTagGroup(id: number) {
    return this.http.get(Endpoints.get(Endpoints.tagGroup, id));
  }

  postTagGroup(name: string, min_games_for_search: number, allow_vote: boolean) {
    return this.http.post(
      Endpoints.get(Endpoints.tagGroupPost),
      { name, allow_vote, min_games_for_search },
    );
  }

  updateTagGroup(name: string, min_games_for_search: number, allow_vote: boolean, id: number) {
    return this.http.patch(
      Endpoints.get(Endpoints.tagGroup, id),
      { name, allow_vote, min_games_for_search },
    );
  }

  deleteTagGroup(id: number) {
    return this.http.delete(Endpoints.get(Endpoints.tagGroup, id));
  }


  // CONFIRMED TAGS
  getTagsConfirmedByGame(gameId: number) {
    return this.http.get(Endpoints.get(Endpoints.tagsConfirmedByGame, gameId));
  }

  postTagConfirmOfGame(tagId: number, gameId: number) {
    return this.http.post(Endpoints.get(Endpoints.tagsConfirmOfGame, tagId, gameId), null);
  }

  deleteTagConfirmOfGame(tagId: number, gameId: number) {
    return this.http.delete(Endpoints.get(Endpoints.tagsConfirmOfGame, tagId, gameId));
  }

  deleteTagConfirmNintendOfGame(tagId: number, gameId: number) {
    return this.http.delete(Endpoints.get(Endpoints.tagsUnconfirmNintendoTag, tagId, gameId));
  }


  // VOTE FOR TAGS
  getVotedTagsByGame(gameCode: string): Observable<TagVotedModel> {
    return this.http.get(Endpoints.get(Endpoints.tagVotedByGame, gameCode)) as Observable<TagVotedModel>;
  }

  postVoteTagByGame(tagId: number, gameCode: string) {
    return this.http.post(Endpoints.get(Endpoints.tagVoteByGame, tagId, gameCode), null);
  }

  deleteVoteTagByGame(tagId: number, gameCode: string) {
    return this.http.delete(Endpoints.get(Endpoints.tagVoteByGame, tagId, gameCode));
  }


  // SUGGESTED TAGS
  getUnconfirmedSuggestedAll(): Observable<SuggestedTags> {
    return this.http.get(Endpoints.get(Endpoints.tagUnconfirmedSuggestedAll)) as Observable<SuggestedTags>;
  }
}
