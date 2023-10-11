// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
// firestore cdn
import { getFirestore, collection, onSnapshot, query, orderBy, addDoc, doc, Timestamp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0dCNdSbcpKPtC_vANjJqXo-vi353ddLU",
    authDomain: "livechat-663ca.firebaseapp.com",
    projectId: "livechat-663ca",
    storageBucket: "livechat-663ca.appspot.com",
    messagingSenderId: "394115928134",
    appId: "1:394115928134:web:d4cdac30b803156a6ffa47"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);


// send message
document.querySelector('#send_button').addEventListener('click', () => {
    if (document.querySelector("#message_content").value && document.querySelector("#user_name").value) {
        addDoc(collection(database, "messages"), {
            sender: document.querySelector("#user_name").value,
            messages: document.querySelector("#message_content").value,
            time: Timestamp.fromDate(new Date())
        });
        document.querySelector("#message_content").value = "";
    }
    else {
        alert('Some fields are empty!');
    }
});

// display messages
onSnapshot(query(collection(database, "messages"), orderBy("time", "asc")), data => {
    document.querySelector('#message_area').innerHTML = '';
    data.forEach(message => {
        // send display
        if (message.data().sender === document.querySelector("#user_name").value) {
            document.querySelector("#message_area").innerHTML +=
                `<div class="row">
                   <div class="col-md-6 offset-md-6">
                       <div class="alert bg-success-subtle m-2 mt-3 rounded-4">
                           <h5 class="fw-bold">You</h5>
                           <span>${message.data().messages}</span>
                       </div>
                       <small class="text-secondary ms-3">${message.data().time.toDate().toLocaleTimeString('en-US')}</small>
                   </div>
               </div>
               `;
        }
        // recive display
        else {
            document.querySelector("#message_area").innerHTML +=
                `<div class="row">
                   <div class="col-md-6">
                       <div class="alert bg-primary text-white m-2 mt-3 rounded-4">
                           <h5 class="fw-bold">${message.data().sender}</h5>
                           <span>${message.data().messages}</span>
                       </div>
                       <small class="text-secondary float-end me-3">${message.data().time.toDate().toLocaleTimeString('en-US')}</small>
                   </div>
               </div>
                   `;
        };
    });
    document.querySelector("#message_area").scrollIntoView(false);
});
