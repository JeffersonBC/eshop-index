// RECOMENDATION
export interface RecomendationRequest {
  recomends: boolean;
}


// REVIEW
export interface ReviewForm {
  review_text: string;
  recomends: boolean;
}


export interface ReviewModel {
  id: number;

  review_text: string;
  recomends: boolean;

  useful: number;
  not_useful: number;
  vote: boolean;

  date: string;
  has_edited: boolean;

  user?: string;
}


// TAGS
export interface TagsPerGroup {
  [genre: string]: {
    id: number;
    name: string;
  }[];
}

export interface TagGroupModel {
  id?: number;
  name: string;
}

export interface TagModel {
  id?: number;
  name: string;
  group: TagGroupModel;
}

export interface TagConfirmedModel {
  nintendo: { [id: number]: boolean };
  staff: { [id: number]: boolean };
}

export interface TagVotedModel {
  [id: number]: boolean;
}

export interface SuggestedTags {
  [gameId: number]: {
    id: number,
    title: string,
    game_code: string,
    game_image: string,
    tags: { [id: number]: string },
  };
}


// ALIKE
export interface SuggestedAlike {
  game1: {
    id: number,
    title: string,
    game_code: string,
    game_image: string,
  };
  game2: {
    id: number,
    title: string,
    game_code: string,
    game_image: string,
  };
}
