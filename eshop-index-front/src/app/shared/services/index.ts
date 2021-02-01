import { AlikeService } from '@services/classification/alike.service';
import { RecomendationService } from '@services/classification/recomendation.service';
import { ReviewService } from '@services/classification/review.service';
import { TagService } from '@services/classification/tag.service';
import { WishlistService } from '@services/classification/wishlist.service';

import { AccountService } from '@services/account.service';
import { AdsenseService } from '@services/adsense.service';
import { AnalyticsService } from '@services/analytics.service';
import { FollowService } from '@services/following.service';
import { FormService } from '@services/form.service';
import { GameService } from '@services/game.service';
import { GameMediaService } from '@services/game-media.service';
import { LoginEmitService } from '@services/login-emit.service';
import { SEOService } from '@services/seo.service';


export const services = [
    AlikeService,
    RecomendationService,
    ReviewService,
    TagService,
    WishlistService,

    AccountService,
    AdsenseService,
    AnalyticsService,
    FollowService,
    FormService,
    GameService,
    GameMediaService,
    LoginEmitService,
    SEOService,
];
