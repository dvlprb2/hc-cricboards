import {
  doc,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {db} from '../firebase.config';
import {getCurrentUser} from './auth';

export interface ClubDocumentData {
  name: string;
  members: Array<string>;
  owner: string;
}

export interface MemberDocumentData {
  name: string;
  matches: number;
  clubs: Array<string>;
  joinDate: string;
}

// Add a new document in collection "clubs"
export const createClub = async (data: ClubDocumentData) => {
  return await addDoc(collection(db, 'clubs'), data);
};

// Add a new member in collection "clubs.members"
export const addMemberToClub = async (clubId: string, memberId: string) => {
  const clubRef = doc(db, 'clubs', clubId);

  return await updateDoc(clubRef, {
    members: arrayUnion(memberId),
  });
};

// Delete a member from collection "clubs.members"
export const removeMemberFromClub = async (
  clubId: string,
  memberId: string,
) => {
  const clubRef = doc(db, 'clubs', clubId);

  return await updateDoc(clubRef, {
    members: arrayRemove(memberId),
  });
};


export const getClubsByUser = async () => {
  const currentUser = await getCurrentUser();
  const q = query(
    collection(db, 'clubs'),
    where('owner', '==', currentUser?.id),
  );

  return await getDocs(q);
};

// Add a new document in collection "members"
export const createMember = async (data: MemberDocumentData) => {
  return await addDoc(collection(db, 'members'), data);
};


export const getMembersByClub = async () => {
  const q = query(
    collection(db, 'members'),
    where('clubs', 'array-contains', 'LDQf2R0yHbhW5AleRrHG'),
  );

  return await getDocs(q);
};