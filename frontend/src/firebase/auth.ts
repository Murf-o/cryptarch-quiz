import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";
import { auth } from "./firebase";
import { firestoreCreateUserInfo } from "./firestore";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  await createUserWithEmailAndPassword(auth, email, password); // returns user credential
  // create user info
  await firestoreCreateUserInfo(email);
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  await signInWithEmailAndPassword(auth, email, password);

  /****** REMOVE ONCE ALL CURRENT USERS BACKFILLED ****/ ///
  await firestoreCreateUserInfo(email);
  /**************************************************/ ///
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  // auth.useDeviceLanguage();
  const result = await signInWithPopup(auth, provider);
  if (!result.user.email) return;
  //create user info
  await firestoreCreateUserInfo(result.user.email);

  // const credential = GoogleAuthProvider.credentialFromResult(result);
  // if (!credential) return result;

  // const token = credential.accessToken;
  // The signed-in user info.
  // const user = result.user;
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
  if (!auth.currentUser)
    return Promise.reject("No user is currently signed in.");
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  if (!auth.currentUser)
    return Promise.reject("No user is currently signed in.");
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/puzzle`,
  });
};
