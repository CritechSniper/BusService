import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyBTFjGPz3pPbXDqLxusue9VaQR-Msr_oTk",
  authDomain: "justtest-5f40e.firebaseapp.com",
  databaseURL: "https://justtest-5f40e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "justtest-5f40e",
  storageBucket: "justtest-5f40e.firebasestorage.app",
  messagingSenderId: "482057327016",
  appId: "1:482057327016:web:299970269b20d58122cd9d",
  measurementId: "G-9V7382JDQ8"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function regUser(name, phoneNumber, password) {
  if (await getUser(phoneNumber)) return "Failed to register user, User already exists!"
  await set(ref(db, 'users/' + phoneNumber), {
    username: name,
    email: email,
    password: password
  })
  .then(() => {return "Data saved successfully!"})
  .catch((error) => {console.error("Write failed:", error); return error;});
}

export async function getUser(phoneNumber) {
  const dbRef = ref(db);
  await get(child(dbRef, `users/${phoneNumber}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return false;
      }
    })
    .catch((error) => {
      return error.message
    });
}

