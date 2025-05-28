
'use server';
import { db, storage } from '@/lib/firebaseConfig';
import type { Design, NewDesignData } from '@/types';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  query,
  orderBy,
  serverTimestamp,
  increment,
  writeBatch,
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';

function convertTimestampToDate(data: any): any {
  if (data?.createdAt instanceof Timestamp) {
    data.createdAt = data.createdAt.toDate();
  }
  if (data?.updatedAt instanceof Timestamp) {
    data.updatedAt = data.updatedAt.toDate();
  }
  return data;
}

// Create a new design with image upload
export async function createDesign(
  designData: Omit<NewDesignData, 'imageUrl'>,
  imageDataUrl: string,
  creatorDisplayName: string
): Promise<string> {
  try {
    // 1. Upload image to Firebase Storage
    const imageName = `designs/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.png`; // Generate a unique name
    const storageRef = ref(storage, imageName);
    const uploadResult = await uploadString(storageRef, imageDataUrl, 'data_url');
    const imageUrl = await getDownloadURL(uploadResult.ref);

    // 2. Add design document to Firestore
    const docRef = await addDoc(collection(db, 'designs'), {
      ...designData,
      imageUrl, // Use the uploaded image URL
      creatorDisplayName,
      votes: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating design: ", error);
    // TODO: Add error handling for image cleanup if Firestore write fails
    throw new Error("Failed to create design.");
  }
}

// Get all designs
export async function getAllDesigns(sortBy: 'votes' | 'createdAt' = 'createdAt', sortOrder: 'desc' | 'asc' = 'desc'): Promise<Design[]> {
  try {
    const designsCol = collection(db, 'designs');
    const q = query(designsCol, orderBy(sortBy, sortOrder));
    const designSnapshot = await getDocs(q);
    const designList = designSnapshot.docs.map(doc => {
      const data = doc.data();
      return convertTimestampToDate({ id: doc.id, ...data }) as Design;
    });
    return designList;
  } catch (error) {
    console.error("Error getting all designs: ", error);
    throw new Error("Failed to retrieve designs.");
  }
}

// Get a single design by ID
export async function getDesignById(id: string): Promise<Design | null> {
  try {
    const designDocRef = doc(db, 'designs', id);
    const docSnap = await getDoc(designDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return convertTimestampToDate({ id: docSnap.id, ...data }) as Design;
    } else {
      console.log("No such design!");
      return null;
    }
  } catch (error) {
    console.error("Error getting design by ID: ", error);
    throw new Error("Failed to retrieve design.");
  }
}

// Update a design (e.g., description, tags)
export async function updateDesign(id: string, updates: Partial<Omit<Design, 'id' | 'createdAt' | 'votes' | 'imageUrl'>>): Promise<void> {
  try {
    const designDocRef = doc(db, 'designs', id);
    await updateDoc(designDocRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating design: ", error);
    throw new Error("Failed to update design.");
  }
}

// Delete a design (includes deleting image from storage)
export async function deleteDesign(id: string): Promise<void> {
  const designDocRef = doc(db, 'designs', id);
  try {
    const designSnap = await getDoc(designDocRef);
    if (!designSnap.exists()) {
      throw new Error("Design not found for deletion.");
    }
    const designData = designSnap.data() as Design;
    
    // Delete image from storage
    if (designData.imageUrl) {
      try {
        const imageRef = ref(storage, designData.imageUrl);
        await deleteObject(imageRef);
      } catch (storageError: any) {
        // Log storage error but proceed with Firestore deletion if image not found or other error
        if (storageError.code !== 'storage/object-not-found') {
          console.warn("Error deleting image from storage, but proceeding with Firestore deletion:", storageError);
        }
      }
    }
    
    // Delete document from Firestore
    await deleteDoc(designDocRef);

    // TODO: Consider deleting associated products or marking them if a design is deleted.
  } catch (error) {
    console.error("Error deleting design: ", error);
    throw new Error("Failed to delete design.");
  }
}

// Vote for a design
export async function voteForDesign(id: string): Promise<void> {
  try {
    const designDocRef = doc(db, 'designs', id);
    await updateDoc(designDocRef, {
      votes: increment(1),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error voting for design: ", error);
    throw new Error("Failed to vote for design.");
  }
}
