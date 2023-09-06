import firebase from '../firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase.js';
// import { query, db, where, collection, getDocs } from '../firebase.js';
// import { mockFirebase } from 'firestore-jest-mock';
// import { mockCollection, mockWhere } from 'firestore-jest-mock/mocks/firestore.js';
// async function getEmails(email) {
//     const matchingUsers = []
//     const q = query(collection(db,'users'), where('email', '==', email));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) =>
//       {
//           matchingUsers.push(doc.data());
//       })
//     return matchingUsers
// }

describe('createUserWithEmailAndPassword', () => {
    test("should be a function", () => {
        expect(typeof createUserWithEmailAndPassword).toBe("function");
    });


});

describe('signInWithEmailAndPassword', () => {
    test("should be a function", () => {
        expect(typeof signInWithEmailAndPassword).toBe("function");
    });


});

// describe('we can query', () => {
//     mockFirebase({
//       database: {
//         users: [
//           {
//             email: 'admin@email.com',
//             name: 'Homer Simpson',
//             state: 'connecticut',
//           },
//           {
//             email: 'admin@mail.com',
//             name: 'Lisa Simpson',
//             state: 'alabama',
//           },
//         ],
//       },
//     });
  
//     test('query with email', async () => {
//       await getEmails('admin@email.com');
  
//       // Assert that we call the correct Firestore methods
//       expect(mockCollection).toHaveBeenCalledWith('users');
//       expect(mockWhere).toHaveBeenCalledWith('email', '==', 'admin@email.com');
//     });
  
//   });