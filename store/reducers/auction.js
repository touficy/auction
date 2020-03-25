import { ADD_AUCTION, RESET_AUCTION, SAVE_AUCTION } from "../actions/auction";

const initialState = {
    item: {
        name: '',
        price: ''
    },
    bidders: [],
    transactions: [],
    winner: ''
};

export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_AUCTION:
            return {
                ...state,
                item: action.payload.item,
                bidders: action.payload.bidders,
                transactions: action.payload.transactions,
                winner: action.payload.winner
            };
        case SAVE_AUCTION: {
            return {
                item: action.payload.item,
                bidders: action.payload.bidders,
                transactions: action.payload.transactions,
                winner: action.payload.winner
            }
        }
        case RESET_AUCTION: {
            return initialState;
        }
        default:
            return state;
    }
};