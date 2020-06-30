import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { notification } from 'antd';
import { ERRORS } from '../../constants';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  signUp = ({ email, password, callback = () => { }, ...userProps }) =>
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) =>
        this.db.ref('users/' + user.uid).set({ email, ...userProps }))
      .then(() => callback())
      .then(() => notification['success']({ message: 'Conta criada com sucesso!' }))
      .catch((e) => {
        callback();
        notification['error']({ message: ERRORS[e.code] || e.message });
      })

  signIn = ({ email, password, callback = () => { } }) =>
    this.auth.signInWithEmailAndPassword(email, password)
      .then(() => callback())
      .then(() => notification['success']({ message: 'Login realizado com sucesso!' }))
      .catch((e) => {
        callback();
        notification['error']({ message: ERRORS[e.code] || e.message });
      })

  signOut = () =>
    this.auth.signOut()
      .then(() => indexedDB.deleteDatabase('firebaseLocalStorageDb'))
      .then(() => notification['success']({ message: 'Logout realizado com sucesso!' }))
      .catch((e) => notification['error']({ message: ERRORS[e.code] || e.message }))

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);

  getSubjects = () => this.db.ref('subjects/');

  getQuizzes = () => this.db.ref('questions/');
}

export default Firebase;
