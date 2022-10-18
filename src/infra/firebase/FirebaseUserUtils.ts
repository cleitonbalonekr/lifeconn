import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  query
} from 'firebase/firestore';

import { FirestoreInstance } from '@/configs/firebase';
import { AuthUser, Contact, MedicalData } from '@/domain/models';

export class FirebaseUserUtils {
  private userCollection: CollectionReference;

  constructor() {
    this.userCollection = collection(FirestoreInstance, 'users');
  }

  public async getMedicalDataByUserId(userId: string): Promise<MedicalData[]> {
    const medicalDataCollection = collection(
      FirestoreInstance,
      'users',
      userId,
      'medicalData'
    );
    const medicalData = await getDocs(query(medicalDataCollection));
    const formattedMedicalData = medicalData.docs.map((medicalDataDoc) => {
      return {
        id: medicalDataDoc.id,
        ...medicalDataDoc.data()
      };
    });
    return formattedMedicalData as MedicalData[];
  }

  public async getContactsByUserId(userId: string): Promise<Contact[]> {
    const contactsCollection = collection(
      FirestoreInstance,
      'users',
      userId,
      'contacts'
    );
    const contacts = await getDocs(query(contactsCollection));
    const formattedContacts = contacts.docs.map((contactsDoc) => {
      return {
        id: contactsDoc.id,
        phoneNumber: contactsDoc.id,
        ...contactsDoc.data()
      };
    });
    return formattedContacts as Contact[];
  }

  public async getUserInfo(userId: string): Promise<AuthUser> {
    const userRef = doc(this.userCollection, userId);
    const user = await getDoc(userRef);
    const medicalData = await this.getMedicalDataByUserId(userId);
    const contacts = await this.getContactsByUserId(userId);

    const userData = {
      authId: user.data()?.authId,
      fullName: user.data()?.fullName,
      totalVoiceToken: user.data()?.totalVoiceToken,
      impactActivation: user.data()?.impactActivation,
      email: user.data()?.email,
      phoneNumber: user.data()?.phoneNumber,
      photo: user.data()?.photo
    };

    return {
      id: user.id,
      ...userData,
      medicalData,
      contacts
    };
  }

  public getMedicalDataRef(userId: string, medicalDataId: string) {
    return doc(this.userCollection, userId, 'medicalData', medicalDataId);
  }
}
