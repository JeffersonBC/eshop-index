import { environment } from '@env/environment';


export class Endpoints {
    // GAME =================
    private static readonly gamesUrl = `${environment.backend}api/games/`;

    public static readonly gameByCode = `${Endpoints.gamesUrl}code/{{0}}/`;
    public static readonly gameSimpleById = `${Endpoints.gamesUrl}simple/id/{{0}}/`;

    public static readonly gamesAllSelectID = `${Endpoints.gamesUrl}all_select/id`;
    public static readonly gamesAllSelectGameCode = `${Endpoints.gamesUrl}all_select/game_code`;

    public static readonly gameAdminHide = `${Endpoints.gamesUrl}admin/hide/{{0}}/`;
    public static readonly gameAdminMerge = `${Endpoints.gamesUrl}admin/merge/{{0}}/{{1}}/`;
    public static readonly gamesAdminAll = `${Endpoints.gamesUrl}admin/all/`;

    // GAME QUERIES
    public static readonly gamesAllSearch = `${Endpoints.gamesUrl}`;
    public static readonly gamesAlikeRecomended = `${Endpoints.gamesUrl}alike_recomended/`;
    public static readonly gamesByLikedTag = `${Endpoints.gamesUrl}liked_tag/`;
    public static readonly gamesByTag = `${Endpoints.gamesUrl}tag/{{0}}/`;
    public static readonly gamesByRandomTag = `${Endpoints.gamesUrl}random_tag/`;
    public static readonly gamesRecomendedFollowing = `${Endpoints.gamesUrl}recomended_following/`;

    // GAME LISTS
    public static readonly gameListSlotAdminAll = `${Endpoints.gamesUrl}admin/game_list/slot/all/`;
    public static readonly gameListSlotAdminPost = `${Endpoints.gamesUrl}admin/game_list/slot/new/`;
    public static readonly gameListSlotAdminDelete = `${Endpoints.gamesUrl}admin/game_list/slot/{{0}}/delete/`;
    public static readonly gameListSlotAdminOrderUp = `${Endpoints.gamesUrl}admin/game_list/slot/{{0}}/order_up/`;
    public static readonly gameListSlotAdminOrderDown = `${Endpoints.gamesUrl}admin/game_list/slot/{{0}}/order_down/`;

    public static readonly gameListPost = `${Endpoints.gamesUrl}admin/game_list/slot/{{0}}/new_list/`;
    public static readonly gameList = `${Endpoints.gamesUrl}admin/game_list/{{0}}/`;
    public static readonly gameListsGet = `${Endpoints.gamesUrl}game_lists/`;

    // GAME MEDIA
    public static readonly gameMediaAllByGameCode = `${Endpoints.gamesUrl}media/all/by_code/{{0}}/`;
    public static readonly gameMediaAllByGameId = `${Endpoints.gamesUrl}media/all/by_id/{{0}}/`;
    public static readonly gameMedia = `${Endpoints.gamesUrl}media/{{0}}/`;
    public static readonly gameMediaPost = `${Endpoints.gamesUrl}media/new/{{0}}/`;
    public static readonly gameMediaOrderUp = `${Endpoints.gamesUrl}media/{{0}}/order/up/`;
    public static readonly gameMediaOrderDown = `${Endpoints.gamesUrl}media/{{0}}/order/down/`;

    // GAME PRICE
    public static readonly gamePriceAllByGameCode = `${Endpoints.gamesUrl}price/all/by_code/{{0}}/`;


    // CLASSIFICATION =======
    private static readonly classificationUrl = `${environment.backend}api/classification/`;

    // ALIKE
    private static readonly alikeUrl = `${Endpoints.classificationUrl}alike/`;

    public static readonly alikeConfirmedAll = `${Endpoints.alikeUrl}confirmed/{{0}}/`;
    public static readonly alikeVotedAll = `${Endpoints.alikeUrl}voted_all/{{0}}/`;
    public static readonly alikeVote = `${Endpoints.alikeUrl}vote/{{0}}/{{1}}/`;

    public static readonly alikeAdmin = `${Endpoints.alikeUrl}admin/{{0}}/{{1}}/`;
    public static readonly alikeConfirmedAllStaff = `${Endpoints.alikeUrl}admin/confirmed/staff/{{0}}/`;

    public static readonly alikeUnconfirmedSuggestedAll = `${Endpoints.alikeUrl}admin/suggested/unconfirmed/all/`;

    // RECOMENDATION
    private static readonly recomendationUrl = `${Endpoints.classificationUrl}recomendation/`;

    public static readonly recomendation = `${Endpoints.recomendationUrl}{{0}}/`;
    public static readonly recomendationsCurrentUser = `${Endpoints.recomendationUrl}user_self/`;
    public static readonly recomendationsCurrentUserAll = `${Endpoints.recomendationUrl}user_self/all/{{0}}/`;
    public static readonly recomendationsUser = `${Endpoints.recomendationUrl}user/{{0}}/`;
    public static readonly recomendationsUserAll = `${Endpoints.recomendationUrl}user/{{0}}/all/{{1}}/`;

    public static readonly recomendationAdminConfirm = `${Endpoints.recomendationUrl}admin/confirm/{{0}}/`;

    // REVIEW
    private static readonly reviewUrl = `${Endpoints.classificationUrl}review/`;

    public static readonly review = `${Endpoints.reviewUrl}{{0}}/`;
    public static readonly reviewsCurrentUser = `${Endpoints.reviewUrl}user_self/`;
    public static readonly reviewsUser = `${Endpoints.reviewUrl}user/{{0}}/`;
    public static readonly reviewsAll = `${Endpoints.reviewUrl}all/{{0}}/`;
    public static readonly reviewVote = `${Endpoints.reviewUrl}vote/{{0}}/`;

    // WISHLIST
    private static readonly wishlistUrl = `${Endpoints.classificationUrl}wishlist/`;

    public static readonly wishlist = `${Endpoints.wishlistUrl}`;
    public static readonly wishlistItem = `${Endpoints.wishlistUrl}{{0}}/`;


    // TAG ==================
    private static readonly tagUrl = `${Endpoints.classificationUrl}tag/`;

    public static readonly tagsAllByGame = `${Endpoints.tagUrl}by_game/{{0}}/`;
    public static readonly tagsAll = `${Endpoints.tagUrl}all/`;
    public static readonly tagsAllByGroup = `${Endpoints.tagUrl}all/by_group/`;
    public static readonly tagsAllBySearcheableGroup = `${Endpoints.tagUrl}all/by_searcheable_group/`;
    public static readonly tagsAllByVotableGroup = `${Endpoints.tagUrl}all/by_votable_group/`;
    public static readonly tag = `${Endpoints.tagUrl}{{0}}/`;
    public static readonly tagPost = `${Endpoints.tagUrl}new/`;
    public static readonly tagMerge = `${Endpoints.tagUrl}merge/{{0}}/{{1}}/`;

    public static readonly tagGroupsAll = `${Endpoints.tagUrl}groups/`;
    public static readonly tagGroup = `${Endpoints.tagUrl}group/{{0}}/`;
    public static readonly tagGroupPost = `${Endpoints.tagUrl}group/new/`;

    public static readonly tagsConfirmedByGame = `${Endpoints.tagUrl}confirmed/{{0}}/`;
    public static readonly tagsConfirmOfGame = `${Endpoints.tagUrl}confirm/{{0}}/{{1}}/`;
    public static readonly tagsUnconfirmNintendoTag = `${Endpoints.tagUrl}unconfirm_nintendo/{{0}}/{{1}}/`;

    public static readonly tagVotedByGame = `${Endpoints.tagUrl}voted/{{0}}/`;
    public static readonly tagVoteByGame = `${Endpoints.tagUrl}vote/{{0}}/{{1}}/`;

    public static readonly tagUnconfirmedSuggestedAll = `${Endpoints.tagUrl}suggested/unconfirmed/all/`;


    // USER =================
    private static readonly userUrl = `${environment.backend}api/user/`;

    public static readonly userActivate = `${Endpoints.userUrl}activate/{{0}}/{{1}}/`;
    public static readonly userActivationEmail = `${Endpoints.userUrl}activate/`;
    public static readonly userCreate = `${Endpoints.userUrl}create/`;
    public static readonly userGet = `${Endpoints.userUrl}get/`;
    public static readonly userGetByUsername = `${Endpoints.userUrl}get_by_username/{{0}}/`;
    public static readonly userPasswordReset = `${Endpoints.userUrl}password/reset/{{0}}/{{1}}/`;
    public static readonly userPasswordResetEmail = `${Endpoints.userUrl}password/reset/`;

    public static readonly userTokenGet = `${Endpoints.userUrl}token_get/`;
    public static readonly userTokenRefresh = `${Endpoints.userUrl}token_refresh/`;

    public static readonly userAdminVerify = `${Endpoints.userUrl}admin_verify/`;
    public static readonly userTokenVerify = `${Endpoints.userUrl}token_verify/`;


    // FOLLOWING ============
    public static readonly followByUsername = `${Endpoints.userUrl}follow/by_username/{{0}}/`;
    public static readonly newsFeed = `${Endpoints.userUrl}newsfeed/`;
    public static readonly followingUsers = `${Endpoints.userUrl}following/`;


    public static get(index: string = '', ...array: Array<String|string|number>) {
        // Get variable index. If not found, use "index"
        let result: string = Endpoints[index] || index;

        // Replaces {{i}} with array[i]
        result = array.reduce<string>((old, curr, i) => old.replace(`{{${i}}}`, curr.toString()), result);
        return result;
    }
}
