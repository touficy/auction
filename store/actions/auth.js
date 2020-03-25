import { AsyncStorage, Alert } from 'react-native';
import firebase from 'firebase';
// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';

export const initializeFirebase = () => {

  return async dispatch => {
    if (!firebase.apps.length) {
      await firebase.initializeApp({
        apiKey: 'AIzaSyAoE82fSBfsj9soor99jpQ-CwaOp5GfE_E',
        authDomain: 'authentication-963bc.firebaseapp.com',
        databaseURL: 'https://authentication-963bc.firebaseio.com',
        projectId: 'authentication-963bc',
        storageBucket: 'authentication-963bc.appspot.com',
        messagingSenderId: '414264319441',
        appId: '1:414264319441:web:e2a142660728e9908b14f0',
        measurementId: 'G-Y14RLPWEX2',
      });
    }

    // await AsyncStorage.getItem('userData', (err, result) => {
    //   result = JSON.parse(result);
    //   if (result != null && result != undefined) {
    //     // console.log('user Id is ' + result.userId);
    //     dispatch({
    //       type: AUTHENTICATE,
    //       payload: {
    //         userId: result.userId,
    //         userName: result.userName,
    //         userPhone: result.userPhone,
    //         userGender: result.userGender
    //       }
    //     });
    //   };

    // });
  }
};

export const authenticate = (userId, userEmail, token) => {
  // console.log(userId + " = " + userName + " = " + userPhone + " = " + userGender);

  return {
    type: AUTHENTICATE, payload: {
      userId,
      userEmail,
      token
    }
  };
};

export const logout = () => {
  // AsyncStorage.removeItem('userData');
  return async dispatch => {
    firebase.auth().signOut();
    await dispatch({ type: LOGOUT });
  }
}

export const signup = (email, name, password,onSuccess) => {

  return async dispatch => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        // console.log(user);
        let account = {}
        account.email = email.toLowerCase()
        account.uid = user.uid
        account.name = name
        await firebase.database().ref('users/' + user.uid).set({
          account
        }).then(() => {
          // ******** Now we need to grap a snapshot from the DB to validate account creation and update the redux store locally ********
          firebase.database().ref('users/' + user.uid).once('value').then(function (snapshot) {
            let updatedUser = snapshot.val();
            // console.log(updatedUser.account);
            dispatch(authenticate(user.uid, email, user.refreshToken));
            
          }).then((error) => {
            console.log(error);
          })
        })
        onSuccess();
        // saveDataToStorage(userID, name, phone, gender);
      })
      .catch((error) => {
        Alert.alert(
          "Authenticate Failed",
          error.message,
          [
            { text: 'Ok', onPress: () => { }, style: 'cancel' },
          ],
        )
        // console.log("Authenticate Failed");
      });


  };
};

export const login = (email, password, onSuccess) => {

  return async dispatch => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => {

        await firebase.database().ref('users/' + user.uid).once('value').then(function (snapshot) {
          let username = snapshot.val();

          {
            !username.account ? console.log('Error') :
            Alert.alert(
              "Logged in successfully",
              "Welcome Back " + username.account.name,
              [
                { text: 'Ok', onPress: () => { }, style: 'cancel' },
              ],
              
            );
            onSuccess();
          }
        })
          .catch((err) => console.log(err));

        dispatch(authenticate(user.uid, email, user.refreshToken));

        // saveDataToStorage(userData.id, userData.name, userData.phoneNumber, userData.gender);
      })
      .catch((error) => {
        Alert.alert(
          "Authenticate Failed",
          error.message,
          [
            { text: 'Ok', onPress: () => { }, style: 'cancel' },
          ],
        )
        // console.log("Authenticate Failed");
      });

  }
};

export const saveProfile = (userId, name, password, phone, gender) => {
  // console.log(name + " = " + password + " = " + phone + " = " + gender);

  return async dispatch => {
    let URL = 'https://www.nurseriesworld.com/ws.php?type=update&format=json&table=customers&columns=name=%27' + name + '%27,gender=%27' + gender + '%27,phoneNumber=%22' + phone + '%22';
    if (password != "") {
      URL += ',password=%22' + password + '%22';
    }
    URL += '&condition=id=' + userId;

    // console.log(URL);
    dispatch(authenticate(userId, name, phone, gender));

    saveDataToStorage(userId, name, phone, gender);

    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("Failed To Update Profile");
    }

    const json = await response.json();
    if (json['posts'][0] != 0) {
      dispatch(authenticate(userId, name, phone, gender));

      saveDataToStorage(userId, name, phone, gender);
    }
  }
};

const saveDataToStorage = (userId, userName, userPhone, userGender) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      userId,
      userName,
      userPhone,
      userGender,
    })
  );
};
