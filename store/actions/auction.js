import { AsyncStorage } from 'react-native';
export const ADD_AUCTION = 'ADD_AUCTION';
export const SAVE_AUCTION = 'SAVE_AUCTION';
export const RESET_AUCTION = 'RESET_AUCTION';

export const initAuctionDB = (success, fail) => {
  return async dispatch => {
    await AsyncStorage.getItem('auctionDB', async (err, result) => {
      result = JSON.parse(result);
      // console.log(result);

      if (result != null && result != undefined) {
        // console.log('user Id is ' + result.userId);
        if (result.item.name == "") {
          AsyncStorage.removeItem('auctionDB');
          fail();
        } else {
          const obj = {

          }
          await dispatch({
            type: ADD_AUCTION,
            payload: {
              item: result.item,
              bidders: result.bidders,
              transactions: result.transactions ? result.transactions : [],
              winner: result.winner != '' ? result.winner : ''
            }
          });
          success();
        }
      } else {
        fail();
      }

    });
  };
};

export const resetAuction = () => {
  return dispatch => {
    AsyncStorage.removeItem('auctionDB');
    dispatch({ type: RESET_AUCTION });
  }
};
export const saveAuction = (item, bidders, transactions, winner) => {
  return async dispatch => {
    dispatch({
      type: SAVE_AUCTION,
      payload: {
        item,
        bidders,
        transactions,
        winner
      }
    })
    AsyncStorage.setItem(
      'auctionDB',
      JSON.stringify({
        item,
        bidders,
        transactions,
        winner
      })
    );
  };
};

export const addAuction = (item, bidders) => {
  return async dispatch => {
    dispatch({
      type: ADD_AUCTION,
      payload: {
        item,
        bidders,
        transactions: [],
        winner: ''
      }
    })
    AsyncStorage.setItem(
      'auctionDB',
      JSON.stringify({
        item,
        bidders,
        transactions: [],
        winner:  ''
      })
    );

  };
};


