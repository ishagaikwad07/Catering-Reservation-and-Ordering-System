import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc, query, where, getDocs, collection, updateDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"; // Added updateDoc import
import app from './firebase-init.js';

// Initialize Firebase
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profilePhone = document.getElementById('profilePhone');
const profileAddress = document.getElementById('profileAddress');
const profileRole = document.getElementById('profileRole');
const profileRegistered = document.getElementById('profileRegistered');
const orders = document.getElementById('orders');
const reservationDetails = document.getElementById('reservationDetails');
const logoutBtn = document.getElementById('logoutBtn');
const backToDashboardBtn = document.getElementById('backToDashboardBtn');
const editProfileBtn = document.getElementById('editProfileBtn'); // Defined editProfileBtn
const editProfileForm = document.getElementById('editProfileForm'); // Defined editProfileForm
const saveProfileBtn = document.getElementById('saveProfileBtn'); // Defined saveProfileBtn
const cancelEditBtn = document.getElementById('cancelEditBtn'); // Defined cancelEditBtn

// Fetch and display profile information
async function loadProfile(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        profileName.textContent = `Name: ${data.firstName} ${data.lastName}`;
        profileEmail.textContent = `Email: ${data.email}`;
        profilePhone.textContent = `Phone: ${data.phone}`;
        profileAddress.textContent = `Address: ${data.address}`;
        profileRole.textContent = `Role: ${data.role}`;
        profileRegistered.textContent = `Registered On: ${data.registrationDate}`;
    } else {
        console.error("No such user document!");
    }
}

// Fetch and display order history
async function loadOrders(uid) {
    const ordersQuery = query(collection(db, "orders"), where("userId", "==", uid));
    const querySnapshot = await getDocs(ordersQuery);

    if (!querySnapshot.empty) {
        orders.textContent = '';
        querySnapshot.forEach((doc) => {
            const order = doc.data();
            orders.innerHTML += `<p>Order ID: ${order.id}, Product: ${order.product}, Quantity: ${order.quantity}</p>`;
        });
    } else {
        orders.textContent = "No orders found.";
    }
}

// Fetch and display reservations
async function loadReservations(uid) {
    const reservationsQuery = query(collection(db, "reservations"), where("userId", "==", uid));
    const querySnapshot = await getDocs(reservationsQuery);

    if (!querySnapshot.empty) {
        reservationDetails.textContent = '';
        querySnapshot.forEach((doc) => {
            const reservation = doc.data();
            reservationDetails.innerHTML += `<p>Reservation Date: ${reservation.date}, Time: ${reservation.time}, Party Size: ${reservation.partySize}</p>`;
        });
    } else {
        reservationDetails.textContent = "No reservations found.";
    }
}

// Logout functionality
logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
});

// Back to Dashboard functionality
backToDashboardBtn.addEventListener('click', () => {
    window.location.href = 'user.html';
});

// Edit Profile functionality
editProfileBtn.addEventListener('click', () => {
    // Show the edit form and hide the profile details
    editProfileForm.style.display = 'block';
    profileDetails.style.display = 'none';

    // Pre-fill the input fields with the current data
    const nameParts = profileName.textContent.split(' ');
    editFirstName.value = nameParts[1]; // Assuming name is "Name: First Last"
    editLastName.value = nameParts[2];
    editPhone.value = profilePhone.textContent.split(': ')[1];
    editAddress.value = profileAddress.textContent.split(': ')[1];
});

// Save Profile Changes
saveProfileBtn.addEventListener('click', async () => {
    const uid = auth.currentUser.uid;
    const updatedData = {
        firstName: editFirstName.value,
        lastName: editLastName.value,
        phone: editPhone.value,
        address: editAddress.value
    };

    try {
        const docRef = doc(db, "users", uid);
        await updateDoc(docRef, updatedData);

        // Update the profile info displayed on the page
        profileName.textContent = `Name: ${updatedData.firstName} ${updatedData.lastName}`;
        profilePhone.textContent = `Phone: ${updatedData.phone}`;
        profileAddress.textContent = `Address: ${updatedData.address}`;

        // Hide the form and show the profile again
        editProfileForm.style.display = 'none';
        profileDetails.style.display = 'block';
    } catch (error) {
        console.error("Error updating profile:", error);
    }
});

// Cancel Edit
cancelEditBtn.addEventListener('click', () => {
    // Hide the edit form and show the profile details
    editProfileForm.style.display = 'none';
    profileDetails.style.display = 'block';
});

// Authentication check
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        loadProfile(uid);
        loadOrders(uid);
        loadReservations(uid);
    } else {
        window.location.href = 'login.html';
    }
});
