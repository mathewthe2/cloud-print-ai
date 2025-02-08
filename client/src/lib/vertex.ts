import { initializeApp } from "firebase/app";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";

// TODO(developer) Replace the following with your app's Firebase configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
// https://firebase.google.com/docs/projects/api-keys
const firebaseConfig = {
  apiKey: "AIzaSyAQqP5EPTEXRIzxR1I9VmEDdxez1T8OCdI", // exposing this key is safe as scope is limited to this project
  authDomain: "poised-octane-449005-q1.firebaseapp.com",
  projectId: "poised-octane-449005-q1",
  storageBucket: "poised-octane-449005-q1.firebasestorage.app",
  messagingSenderId: "270802040829",
  appId: "1:270802040829:web:fcfe5fbd2653bc40b04b94",
};

// Initialize FirebaseApp
const firebaseApp = initializeApp(firebaseConfig);

// Initialize the Vertex AI service
const vertexAI = getVertexAI(firebaseApp);

// Initialize the generative model with a model that supports your use case
const model = getGenerativeModel(vertexAI, { model: "gemini-2.0-flash-001" });

async function run() {
  // Provide a prompt that contains text
  const prompt = "Write a story about a magic backpack.";

  // To generate text output, call generateContent with the text input
  const result = await model.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  console.log(text);
}

export default run;
