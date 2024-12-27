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
git clone https://github.com/yourusername/e-commerce-dashboard.git

