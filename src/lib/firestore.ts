import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

export type ActivityDoc = {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  createdBy: string;
  createdAt?: any;
};

// reference ไปยัง collection "activities"
const activitiesCol = collection(db, 'activities');

// บันทึกกิจกรรมใหม่
export async function createActivity(doc: ActivityDoc): Promise<string> {
  const payload = {
    ...doc,
    createdAt: serverTimestamp()
  };
  const ref = await addDoc(activitiesCol, payload);
  return ref.id;
}

// ดึงกิจกรรมทั้งหมด (ล่าสุดอยู่บนสุด)
export async function getActivities(): Promise<(ActivityDoc & { id: string })[]> {
  const q = query(activitiesCol, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as ActivityDoc) }));
}