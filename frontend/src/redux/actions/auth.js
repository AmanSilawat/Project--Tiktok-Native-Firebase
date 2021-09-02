import firebase from 'firebase';
import { USER_STATE_CHANGE } from './../constants'
// import 'firebase/firebase-auth';

export const userAuthStateListener = () => dispatch => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            dispatch(getCurrentUserData())
        } else {
            dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true })
        }
    })
}

export const getCurrentUserData = () => dispatch => {
    console.log('object :>> ', 'Login');
    firebase.firestore()
        .collection('user')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((res) => {
            console.log('res :>> ', res);
            if (res.exists) {
                return dispatch({
                    type: USER_STATE_CHANGE,
                    currentUser: res.data(),
                    loaded: true
                })
            }
        })
}

export const login = (email, password) => dispatch => new Promise((resolve, reject) => {
    console.log('login :>> ');
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            resolve()
        }).catch((error) => {
            reject(error)
        })
})

export const register = (email, password) => dispatch => new Promise((resolve, reject) => {
    console.log('register :>> ');
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            resolve()
        }).catch((error) => {
            reject(error)
        })
})