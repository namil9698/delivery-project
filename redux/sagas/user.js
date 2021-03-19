import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
// import { logInAPI, logOutAPI } from '../firebase';
import firebase from '../firebase';

const logInAPI = action => {
  if (action.data === 'google') {
    var providerGoogle = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(providerGoogle);
  } else if (action.data === 'anonymous') {
    return firebase.auth().signInAnonymously();
  } else {
  }
};

const logOutAPI = () => {
  return firebase.auth().signOut();
};

function* logInAction(action) {
  try {
    const result = yield call(logInAPI, action);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result,
    });
  } catch (e) {
    console.log('error', e);
  }
}

function* logOutAction() {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: 'LOG_OUT_SUCCESS',
    });
  } catch (e) {
    console.log('error', e);
  }
}

function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logInAction);
}

function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOutAction);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
