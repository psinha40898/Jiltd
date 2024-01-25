import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase.js';
//insertion test
import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    RulesTestEnvironment,
    cleanup,
  } from "@firebase/rules-unit-testing"
  // (1)
  // https://firebase.google.com/docs/firestore/security/test-rules-emulato
  // https://www.npmjs.com/package/@firebase/rules-unit-testing
  const projectId = 'your-project-id';

  let testEnv;
  // npx kill-port 9099 5001 8080 9000 5000 8085 9199 9299 4000
  beforeEach(async () => {
    testEnv = await initializeTestEnvironment({ projectId, database: { host: 'localhost', port: 9000 }, });
  });
  
  afterEach(async () => {
    // Clean up the test environment after all tests have completed.
    await testEnv.cleanup();
  });
  
  describe('Firebase Security Rules Tests', () => {
    beforeEach(async () => {
      // Clear the Realtime Database before each test.
      await testEnv.clearDatabase();
    })
    test("should be a function", () => {
        expect(typeof signInWithEmailAndPassword).toBe("function");
    });

});

describe('signInWithEmailAndPassword', () => {
    test("should be a function", () => {
        expect(typeof signInWithEmailAndPassword).toBe("function");
    });


});
