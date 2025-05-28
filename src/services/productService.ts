
'use server';
import { db } from '@/lib/firebaseConfig';
import type { Product, NewProductData } from '@/types';
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
  where,
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

// Create a new product (e.g., when a design wins and becomes a product)
export async function createProduct(productData: NewProductData): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating product: ", error);
    throw new Error("Failed to create product.");
  }
}

// Get all products
export async function getAllProducts(sortBy: 'price' | 'createdAt' | 'name' = 'createdAt', sortOrder: 'desc' | 'asc' = 'desc'): Promise<Product[]> {
  try {
    const productsCol = collection(db, 'products');
    const q = query(productsCol, orderBy(sortBy, sortOrder));
    const productSnapshot = await getDocs(q);
    const productList = productSnapshot.docs.map(doc => {
      const data = doc.data();
      return convertTimestampToDate({ id: doc.id, ...data }) as Product;
    });
    return productList;
  } catch (error) {
    console.error("Error getting all products: ", error);
    throw new Error("Failed to retrieve products.");
  }
}

// Get a single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const productDocRef = doc(db, 'products', id);
    const docSnap = await getDoc(productDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return convertTimestampToDate({ id: docSnap.id, ...data }) as Product;
    } else {
      console.log("No such product!");
      return null;
    }
  } catch (error) {
    console.error("Error getting product by ID: ", error);
    throw new Error("Failed to retrieve product.");
  }
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const productsCol = collection(db, 'products');
    const q = query(productsCol, where('category', '==', category), orderBy('createdAt', 'desc'));
    const productSnapshot = await getDocs(q);
    const productList = productSnapshot.docs.map(doc => {
      const data = doc.data();
      return convertTimestampToDate({ id: doc.id, ...data }) as Product;
    });
    return productList;
  } catch (error) {
    console.error("Error getting products by category: ", error);
    throw new Error("Failed to retrieve products by category.");
  }
}

// Update a product
export async function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<void> {
  try {
    const productDocRef = doc(db, 'products', id);
    await updateDoc(productDocRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating product: ", error);
    throw new Error("Failed to update product.");
  }
}

// Delete a product
// Note: This usually means it's no longer for sale. The original design might still exist.
// Images for products are typically shared with designs, so deleting product images is not done here.
export async function deleteProduct(id: string): Promise<void> {
  try {
    const productDocRef = doc(db, 'products', id);
    await deleteDoc(productDocRef);
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw new Error("Failed to delete product.");
  }
}
