
'use server';
import { db } from '@/lib/firebaseConfig';
import type { UserProfile } from '@/types';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';

function convertTimestampToDate(data: any): any {
  if (data?.createdAt instanceof Timestamp) {
    data.createdAt = data.createdAt.toDate();
  }
  if (data?.updatedAt instanceof Timestamp) {
    data.updatedAt = data.updatedAt.toDate();
  }
  return data;
}

// Create or update a user profile (typically on first login or profile update)
// User ID comes from Firebase Auth (auth.currentUser.uid)
export async function upsertUserProfile(userId: string, profileData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt' | 'email'> & { email: string }): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      // Update existing profile
      await updateDoc(userDocRef, {
        ...profileData,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Create new profile
      await setDoc(userDocRef, {
        id: userId, // Ensure id is part of the document
        ...profileData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error creating/updating user profile: ", error);
    throw new Error("Failed to create or update user profile.");
  }
}

// Get a user profile by ID
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return convertTimestampToDate({ id: docSnap.id, ...data }) as UserProfile;
    } else {
      console.log("No such user profile!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile: ", error);
    throw new Error("Failed to retrieve user profile.");
  }
}

// Example: Update specific fields like username
export async function updateUserProfileFields(userId: string, updates: Partial<Omit<UserProfile, 'id' | 'email' | 'createdAt' >>): Promise<void> {
    try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {
            ...updates,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error updating user profile fields: ", error);
        throw new Error("Failed to update user profile fields.");
    }
}
