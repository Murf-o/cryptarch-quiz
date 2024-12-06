import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "./firebase";
import { getAuth } from "firebase/auth";

const userScoresRef = collection(firestore, "user_scores");

const userInfoRef = collection(firestore, "users");
const auth = getAuth();

export const firestoreIsUsernameTaken = async (username: string) => {
  const q = query(userInfoRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const firestoreCreateUserInfo = async (email: string) => {
  if (!email) {
    throw new Error("Email is required to create user info");
  }

  //check if doc already exists
  const q = query(userInfoRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  // if it already exists, do nothing
  if (!querySnapshot.empty) {
    return;
  }

  // Create the user info document
  const userInfoData = {
    email: email,
    username: email.split("@")[0],
    puzzlesSolved: 0,
  };

  try {
    const docRef = await addDoc(userInfoRef, userInfoData);
    return docRef.id; // Return the document ID for reference
  } catch (error) {
    console.error("Error creating user info:", error);
    throw new Error("Failed to create user info");
  }
};

export const firestoreSetUsername = async (newUsername: string) => {
  const email = auth.currentUser?.email;

  if (!email) {
    throw new Error("User is not authenticated.");
  }

  // Check if the username is already taken
  const isUsernameTaken = await firestoreIsUsernameTaken(newUsername);
  if (isUsernameTaken) {
    throw new Error("Username is already taken.");
  }

  // Check if the user has a document already
  const querySnapshot = await getDocs(
    query(userInfoRef, where("email", "==", email))
  );

  if (querySnapshot.empty) {
    // If the user document does not exist, create it
    await addDoc(userInfoRef, {
      email,
      username: newUsername,
      puzzlesSolved: 0,
    });
  } else {
    // If the user document exists, update the username
    await updateDoc(querySnapshot.docs[0].ref, { username: newUsername });
  }
};

export const firestoreSaveUserScore = async (score: number, email: string) => {
  // sanitize score
  if (!Number.isFinite(score) || score < 0) {
    throw new Error("Invalid score: Score must be a non-negative number.");
  }
  // validate `email`
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(email)) {
  //   throw new Error("Invalid email: Please provide a valid email address.");
  // }
  try {
    await addDoc(userScoresRef, {
      email,
      score,
      date: serverTimestamp(),
      // puzzle, convert puzzle to a string and save it here
    });
  } catch (e) {
    throw new Error("Error adding document: " + e);
  }
};

export const firestoreGetHighestUserScore = async (email: string) => {
  const q = query(userScoresRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    let highestScore = 0;

    querySnapshot.forEach((doc) => {
      const score = doc.data().score;
      if (score > highestScore) {
        highestScore = score;
      }
    });
    return highestScore;
  } else {
    // If no scores found for this email
    return null;
  }
};

export const firestoreGetUserScores = async (email: string) => {
  const q = query(userScoresRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const scores: number[] = [];
    querySnapshot.forEach((doc) => {
      const score = doc.data().score;
      scores.push(score);
    });
    return scores;
  } else {
    return null;
  }
};

export interface UserStats {
  email: string; // e.g., "something@gmail.com"
  username: string; // e.g., "dumb_user"
  puzzlesSolved: number; // e.g., 0
}

export const firestoreGetLeaderboard = async () => {
  const q = query(userInfoRef, orderBy("puzzlesSolved", "desc"));
  const querySnapshot = await getDocs(q);

  const usersData: UserStats[] = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  })) as UserStats[];

  return usersData;
};

export const firestoreGetUserInfo = async () => {
  if (!auth.currentUser?.email) {
    throw Error("Not authenticated");
  }
  const email = auth.currentUser.email;
  const q = query(userInfoRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);

  // Check if no documents are returned
  if (querySnapshot.empty) {
    throw new Error("No info found");
  }

  // Each user only has one doc in firestore, get the first document from the snapshot
  const doc = querySnapshot.docs[0];
  return doc.data(); // Return the data from the document
};

export const firestoreIncrementPuzzlesSolved = async () => {
  if (!auth.currentUser?.email) {
    throw new Error("Not authenticated");
  }

  const email = auth.currentUser.email;
  const q = query(userInfoRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);

  // if no user info exists
  if (querySnapshot.empty) {
    throw new Error("User Info does not exist");
  }

  const doc = querySnapshot.docs[0];
  const data = doc.data();

  if (!data || typeof data.puzzlesSolved !== "number") {
    throw new Error(
      "Invalid data format: puzzlesSolved is missing or not a number"
    );
  }

  const currentPuzzlesSolved = data.puzzlesSolved;

  // Increment puzzlesSolved in Firestore
  await updateDoc(doc.ref, {
    puzzlesSolved: currentPuzzlesSolved + 1,
  });
