import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { firestore } from "./firebase";

const userScoresRef = collection(firestore, "user_scores");

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
