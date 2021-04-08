import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
// import { logInAPI, logOutAPI } from '../firebase';
import firebase from '../firebase';
import { useRouter } from 'next/router';

import {
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  ORDER_SAVE_SUCCESS,
  GET_USERDATA_SUCCESS,
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  ORDER_SAVE_REQUEST,
  GET_USERDATA_REQUEST,
  LOG_IN_FAILURE,
  LOG_OUT_FAILURE,
  ORDER_SAVE_FAILURE,
  GET_USERDATA_FAILURE,
  ORDER_POPUP_OPEN,
} from '../reducers/user';

//ACTION
function* logInAction(action) {
  try {
    const myAuth = firebase.auth();
    const authProvider = new firebase.auth.GoogleAuthProvider();
    const result =
      action.data === 'google'
        ? yield call([myAuth, myAuth.signInWithPopup], authProvider)
        : yield call([myAuth, myAuth.signInAnonymously]);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result,
    });
    yield put({
      type: GET_USERDATA_REQUEST,
      data: {
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
      },
    });
  } catch (err) {
    console.log('err.message:', err.message);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* logOutAction() {
  try {
    const myAuth = firebase.auth();
    yield call([myAuth, myAuth.signOut]);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.log('err.message:', err.message);
    yield put({
      type: LOG_OUT_FAILURE,
    });
  }
}

function* orderSaveAction(action) {
  try {
    const user = action.data.user;
    const memberType = user.email && user.name ? 'member' : 'non-member';
    const myDB = firebase.firestore();
    const docRef = myDB.collection(memberType).doc(user.uid);
    if (memberType === 'member' && action.data.history.length > 0) {
      yield call([docRef, docRef.update], {
        history: [
          ...action.data.history,
          {
            ...action.data.myFoodList,
            totalPrice: action.data.totalPrice,
            orderDate: action.data.orderDate,
          },
        ],
      });
    } else {
      yield call([docRef, docRef.set], {
        user: {
          name: memberType === 'member' ? user.name : '비회원',
          email: memberType === 'member' ? user.email : '',
        },
        history: [
          {
            ...action.data.myFoodList,
            totalPrice: action.data.totalPrice,
            orderDate: action.data.orderDate,
          },
        ],
      });
    }

    yield put({
      type: ORDER_SAVE_SUCCESS,
    });
    yield put({
      type: GET_USERDATA_REQUEST,
      data: user,
    });
    yield put({
      type: ORDER_POPUP_OPEN,
    });
  } catch (err) {
    console.log('err.message:', err.message);
    yield put({
      type: ORDER_SAVE_FAILURE,
    });
  }
}

function* getUserDataAction(action) {
  try {
    const user = action.data;
    const memberType = user.email && user.name ? 'member' : 'non-member';
    const myDB = firebase.firestore();
    const docRef = myDB.collection(memberType).doc(user.uid);
    const myDocument = yield call([docRef, docRef.get]);
    const myData = yield call([myDocument, myDocument.data]);
    yield put({
      type: GET_USERDATA_SUCCESS,
      data: myData,
    });
  } catch (err) {
    console.log('err.message:', err.message);
    yield put({
      type: GET_USERDATA_FAILURE,
    });
  }
}

//WATCH
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logInAction);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOutAction);
}

function* watchOrderSave() {
  yield takeLatest(ORDER_SAVE_REQUEST, orderSaveAction);
}

function* watchGetUserData() {
  yield takeLatest(GET_USERDATA_REQUEST, getUserDataAction);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchOrderSave), fork(watchGetUserData)]);
}
