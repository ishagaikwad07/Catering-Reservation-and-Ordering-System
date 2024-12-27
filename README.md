# Catering-Reservation-and-Ordering-System

This project features a Firebase-powered Catering Reservation and Ordering system with separate functionalities for admins and users. Admins can upload products and view orders, while users can view products, add them to their cart, place orders, and manage their profile.

## Features

### Admin Features:
- **Upload Products**: Admins can upload new products to the system by entering the product name and price.
- **View Orders**: Admins can view all customer orders, including product name and quantity.

### User Features:
- **View Products**: Users can browse the available products with their details (ID, name, price).
- **Add to Cart**: Users can add products to their cart by providing the product ID.
- **Place Orders**: Users can place an order for a product by specifying the product ID and quantity.
- **View Orders**: Users can view their previous orders.
- **Profile**: Users can view and manage their profile.

### Authentication:
- **Firebase Authentication** is used for user login and session management.
- Admin users are redirected to the homepage if they are not logged in as admins.
- Regular users are redirected to the homepage if they are logged in as admins.

## Setup Instructions

### Prerequisites

- Node.js installed on your system (to use modules like `import`).
- A Firebase account and project with Firestore and Firebase Authentication enabled.

### 1. Clone the Repository
Clone this repository to your local machine:

```bash
git clone https://github.com/ishagaikwad07/Catering-Reservation-and-Ordering-System.git
```

2. Initialize Firebase
In order to use Firebase services like Firestore and Authentication, you need to create a Firebase project and initialize it.

Go to the Firebase Console.
Create a new Firebase project.
Set up Firebase Authentication and Firestore in your Firebase console.
Obtain your Firebase project's configuration details, which you will use in the firebase-init.js file.


3. Add Firebase Configuration
In your project folder, create a file named firebase-init.js and add your Firebase config object:

```bash
// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

const app = initializeApp(firebaseConfig);
export default app;
```

4. Run the Application
You can deploy this app on any server or local server environment. If you're using local development, you can use a simple web server like http-server or any other tool of your choice.

Install http-server (if not already installed):



```bash
npm install -g http-server
```
Run the application:


```bash
http-server -p 8080
```
Now, visit http://localhost:8080 in your browser to interact with the admin and user dashboards.


