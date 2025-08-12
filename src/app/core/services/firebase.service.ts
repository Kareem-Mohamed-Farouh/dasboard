import { Injectable } from '@angular/core';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../base/environments/environmentt';
import { Supply } from '../../shared/intterface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db = getFirestore(initializeApp(environment.firebase));

  constructor() {}

  async getAll(): Promise<Supply[]> {
    const querySnapshot = await getDocs(collection(this.db, 'supplies'));
    return querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Supply));
  }

  async create(supply: Supply) {
    await addDoc(collection(this.db, 'supplies'), supply);
  }

  async update(id: string, supply: Supply) {
    await updateDoc(doc(this.db, 'supplies', id), { ...supply });
  }

  async delete(id: string) {
    await deleteDoc(doc(this.db, 'supplies', id));
  }
}
