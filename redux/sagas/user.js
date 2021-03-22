import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
// import { logInAPI, logOutAPI } from '../firebase';
import firebase from '../firebase';

import {
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  ORDER_SAVE_SUCCESS,
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  ORDER_SAVE_REQUEST,
  GET_USERDATA_REQUEST,
  GET_USERDATA_SUCCESS,
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
  } catch (e) {
    console.log('error', e);
  }
}

function* logOutAction() {
  try {
    const myAuth = firebase.auth();
    yield call([myAuth, myAuth.signOut]);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) {
    console.log('error', e);
  }
}

function* orderSaveAction(action) {
  try {
    const user = action.data.user;
    const isMember = user.email && user.name ? 'member' : 'non-member';
    const myDB = firebase.firestore();
    const docRef = myDB.collection(isMember).doc(user.uid);
    if (isMember === 'member') {
      yield call([docRef, docRef.update], {
        history: [
          ...action.data.history,
          {
            ...action.data.myFoodList,
            totalPirce: action.data.totalPirce,
          },
        ],
      });
    } else {
      yield call([docRef, docRef.set], {
        user: {
          name: '비회원',
          email: '',
        },
        history: [
          {
            ...action.data.myFoodList,
            totalPirce: action.data.totalPirce,
          },
        ],
      });
    }

    yield put({
      type: ORDER_SAVE_SUCCESS,
    });
  } catch (e) {
    console.log('error', e);
  }
}

function* getUserDataAction(action) {
  try {
    const user = action.data;
    const isMember = user.email && user.name ? 'member' : 'non-member';
    const myDB = firebase.firestore();
    const docRef = myDB.collection(isMember).doc(user.uid);
    const myDocument = yield call([docRef, docRef.get]);
    const myData = yield call([myDocument, myDocument.data]);
    yield put({
      type: GET_USERDATA_SUCCESS,
      data: myData,
    });
  } catch (e) {
    console.log('error', e);
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
