import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc,addDoc,collection,getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import app from './firebase-init.js'

// Initialize Firebase
const auth = getAuth(app);
const db = getFirestore(app);

// Check for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        const loggedInUserId = user.uid;
        const docRef = doc(db, "users", loggedInUserId);
        
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    if (userData.role !== "admin") {
                        window.location.href = "homepage.html"; // Redirect if not admin
                    }
                } else {
                    console.log("No document found for the logged-in user");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    } else {
        window.location.href = "login.html"; // Redirect to login page if not logged in
    }
});

// Logout functionality
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location.href = 'index.html'; // Redirect after logging out
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
});

// Event listeners for buttons
document.getElementById('uploadProductBtn').addEventListener('click', uploadProduct);
document.getElementById('viewOrdersBtn').addEventListener('click', viewOrders);
// Function Definitions
async function uploadProduct() {
  const productName = prompt("Enter Product Name:");
  const productPrice = prompt("Enter Product Price:");

  if (productName && productPrice) {
      try {
          // Ensure product price is converted to a number
          const price = parseFloat(productPrice);

          if (isNaN(price) || price <= 0) {
              alert("Please enter a valid price.");
              return;
          }

          // Generate a document reference with a unique ID
          const docRef = doc(collection(db, "products"));

          // Set the product document with the generated ID
          await setDoc(docRef, {
              id: docRef.id, // Store the document ID as the `id` field
              name: productName.trim(),
              price: price
          });

          alert(`Product uploaded successfully! Product ID: ${docRef.id}`);
          console.log("Product uploaded with ID: ", docRef.id);
      } catch (error) {
          console.error("Error uploading product: ", error.message);
          alert("Failed to upload the product. Please try again.");
      }
  } else {
      alert("Product Name and Price are required!");
  }
}
// Function to view orders
async function viewOrders() {
  try {
      // Fetch orders from Firestore
      const ordersQuerySnapshot = await getDocs(collection(db, "orders"));

      // Check if there are any orders
      if (ordersQuerySnapshot.empty) {
          alert("No orders found.");
          return;
      }

      // Loop through the orders and display their details
      let orderDetails = "";
      ordersQuerySnapshot.forEach((doc) => {
          const orderData = doc.data();
          orderDetails += `Order ID: ${doc.id}, Product: ${orderData.product}, Quantity: ${orderData.quantity}\n`;
      });

      // Display order details
      alert(orderDetails);
  } catch (error) {
      console.error("Error fetching orders: ", error);
      alert("Failed to fetch orders. Please try again.");
  }
}
