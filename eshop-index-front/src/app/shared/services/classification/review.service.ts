import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ReviewModel } from '@models';
import { Endpoints } from '@shared/utils/endpoints.util';


@Injectable()
export class ReviewService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  // REVIEW
  getReview(gameCode: string) {
    return this.http.get(Endpoints.get('review', gameCode));
  }

  postReview(review: ReviewModel, gameCode: string) {
    return this.http.post(Endpoints.get('review', gameCode), review);
  }

  deleteReview(gameCode: string) {
    return this.http.delete(Endpoints.get('review', gameCode));
  }

  // VOTE
  postVoteReview(vote: boolean, reviewId: number) {
    return this.http.post(Endpoints.get('reviewVote', reviewId), { vote });
  }

  deleteVoteReview(reviewId: number) {
    return this.http.delete(Endpoints.get('reviewVote', reviewId));
  }

  // BY GAME
  getReviewsAll(gameCode: string, qtd?: number, offset?: number): Observable<ReviewModel[]> {
    const params = {};
    if (qtd) { params['qtd'] = qtd; }
    if (offset) { params['offset'] = offset; }

    return this.http.get(Endpoints.get('reviewsAll', gameCode), { params }) as Observable<ReviewModel[]>;
  }
}
