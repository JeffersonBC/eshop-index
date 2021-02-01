import { GameModel } from '@models/game.model';


export interface GameListSlot {
    id: number;
    oder: number;
    lists: any[];
}

export interface GameListForm {
    title: string;
    query_json: string;
    frequency: number;
}

export interface GameListModel {
    games: GameModel[];
    title: string;
}
