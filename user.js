import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import app from './firebase-init.js'

// Initialize Firebase
const auth = getAuth(app);
const db = getFirestore(app);

// Variable to store student's name
let studentName = "";

// Check for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        const loggedInUserId = user.uid;

        // Fetch user data from Firestore
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    if (userData.role === "user") {
                        studentName = userData.name;
                        // User is a student, so allow access to the dashboard
                        console.log("User logged in successfully");
                    } else {
                        // Redirect non-students to homepage
                        window.location.href = "homepage.html"; 
                    }
                } else {
                    console.error("User data not found");
                    // Optionally log out the user if no data is found
                    signOut(auth);
                    window.location.href = "login.html";
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                signOut(auth);
                window.location.href = "login.html";
            });
    } else {
        // Redirect to login page if user is not authenticated
        window.location.href = "login.html";
    }
});

// Logout functionality
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location.href = 'index.html'; // Redirect to login page after logout
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
});

// Event Listeners
document.getElementById("viewProductsBtn").addEventListener("click", viewProducts);
document.getElementById("addToCartBtn").addEventListener("click", addToCart);
document.getElementById("myOrdersBtn").addEventListener("click", myOrders);
document.getElementById("placeOrderBtn").addEventListener("click", placeOrder);
document.getElementById("myProfileBtn").addEventListener("click", myProfile);

// Function Definitions

// View Products
async function viewProducts() {
    const productsContainer = [];
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        const productId = doc.id; // Firestore document ID
        alert(`Product ID: ${productId}, Name: ${productData.name}, Price: ${productData.price}`);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
// Add to Cart
// Add to Cart
async function addToCart() {
  const productId = prompt("Enter Product ID to add to cart:");
  try {
      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
          const cartRef = doc(collection(db, "cart")); // Generate a new document ID
          await setDoc(cartRef, {
              id: cartRef.id, // Store the document ID in the `id` field
              productId,
              userId: auth.currentUser.uid,
              productName: productSnap.data().name,
              price: productSnap.data().price,
              quantity: 1,
          });
          alert("Product added to cart successfully!");
      } else {
          alert("Invalid Product ID.");
      }
  } catch (error) {
      console.error("Error adding to cart:", error);
  }
}

// My Orders
async function myOrders() {
  try {
      const ordersQuery = query(
          collection(db, "orders"),
          where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(ordersQuery);
      querySnapshot.forEach((doc) => {
          alert(`Order ID: ${doc.id}, Product: ${doc.data().product}, Quantity: ${doc.data().quantity}`);
      });
  } catch (error) {
      console.error("Error fetching orders:", error);
  }
}

// Place Order
async function placeOrder() {
  const productId = prompt("Enter Product ID to place an order:");
  const quantity = prompt("Enter Quantity:");
  if (productId && quantity) {
      try {
          const orderRef = doc(collection(db, "orders")); // Generate a new document ID
          await setDoc(orderRef, {
              id: orderRef.id, // Store the document ID in the `id` field
              product: productId,
              quantity: parseInt(quantity),
              userId: auth.currentUser.uid,
          });
          alert("Order placed successfully!");
      } catch (error) {
          console.error("Error placing order:", error);
      }
  } else {
      alert("Product ID and Quantity are required!");
  }
}

// My Profile
async function myProfile() {
  window.location.href = "profile.html";
}
