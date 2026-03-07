import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export const firebaseConfig = { apiKey: "AIzaSyBTFjGPz3pPbXDqLxusue9VaQR-Msr_oTk", authDomain: "justtest-5f40e.firebaseapp.com", databaseURL: "https://justtest-5f40e-default-rtdb.europe-west1.firebasedatabase.app", projectId: "justtest-5f40e", storageBucket: "justtest-5f40e.firebasestorage.app", messagingSenderId: "482057327016", appId: "1:482057327016:web:299970269b20d58122cd9d", measurementId: "G-9V7382JDQ8" };
const app = initializeApp(firebaseConfig), db = getDatabase(app);

export async function Get(dir) { try { const s = await get(child(ref(db), dir)); return s.exists() ? s.val() : false; } catch (e) { return e.message; } }
export async function getUser(p) { return await Get(`users/${p}`); }
export async function getBus(b) { return await Get(`buses/${b}`); }
export async function getAllBuses() { 
  const arr = [];
  const stuff = await Get("buses")
  for ( const b in stuff) {
    arr.push({
      number: b.toString(),
      seatnumbers: stuff[b]?.seatnumbers,
      maxSeats: stuff[b]?.maxSeats,
      nextStop: stuff[b]?.destination,
      eta: stuff[b]?.eta,
    })
  }
  return arr; 
}
export async function regUser(name, p, pw, email = "") { if (await getUser(p)) return "User already exists!"; try { await set(ref(db, 'users/' + p), { username: name, password: pw, email: email }); return "Data saved successfully!"; } catch (e) { return e.message; } }