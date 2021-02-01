import { AdminResolver } from '@resolvers/admin.resolver';
import { AuthResolver } from '@resolvers/auth.resolver';
import { GameListResolver } from '@resolvers/game-list.resolver';
import { GameMediaResolver } from '@resolvers/game-media.resolver';
import { LoggedUserResolver } from '@resolvers/logged-user.resolver';
import { RecomendationResolver } from '@resolvers/recomendation.resolver';
import { RecomendationsCurrentUserResolver } from '@resolvers/recomendations-current-user.resolver';
import { ReviewResolver } from '@resolvers/review.resolver';
import { TagGroupResolver } from '@resolvers/tag-group.resolver';
import { TagResolver } from '@resolvers/tag.resolver';
import { UserResolver } from '@resolvers/user.resolver';
import { VotedSimilarResolver } from '@resolvers/voted-similar.resolver';
import { VotedTagResolver } from '@resolvers/voted-tag.resolver';


export const resolvers = [
    AdminResolver,
    AuthResolver,
    GameListResolver,
    GameMediaResolver,
    LoggedUserResolver,
    RecomendationResolver,
    RecomendationsCurrentUserResolver,
    ReviewResolver,
    TagGroupResolver,
    TagResolver,
    UserResolver,
    VotedSimilarResolver,
    VotedTagResolver,
];
