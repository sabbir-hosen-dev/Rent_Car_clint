# Clint - Car Rental System (Client Side)

**Clint** is a modern, feature-rich, and responsive car rental web application built using **React** and associated technologies. The platform provides users with a seamless experience for browsing, booking, managing, and analyzing rental cars with real-time availability updates and secure authentication.

---

## Live Demo

Explore the live application here:  
[**Clint Live Demo**](https://rent-car-881ec.web.app/)

---

## Features

### User Features
- **Browse & Filter Cars**: Search for available rental cars based on price, availability, and location.
- **Car Management**: Authenticated users can add, update, and delete car listings.
- **Booking System**: Users can book, cancel, and manage their bookings with real-time updates.
- **Secure Authentication**: User authentication via **Firebase Authentication** and **JWT**.
- **Real-Time Data Updates**: Availability and booking statuses update dynamically.
- **Search Functionality**: Easily find cars by model, brand, or location.
- **Daily Rental Price Analysis**: Visualize rental trends using **Recharts**.

### Admin Features
- **Car & User Management**: Admins can view, add, update, and delete cars and manage user bookings.
- **Comprehensive Dashboard**: Get insights into total bookings, revenue, and available cars.
- **Secure Access Control**: Admin-only features protected by JWT-based authentication.

---

## How to Use

1. **Access the Platform**:
   - Visit the live website using the link above.
   - Register or log in with existing credentials.

2. **Search & Browse**:
   - Use filters and the search bar to find cars that match your requirements.

3. **Book a Car**:
   - Select a car, choose rental dates, and confirm your booking.

4. **Manage Your Cars (For Owners)**:
   - Navigate to the "My Cars" section to add or update listings.
   - Manage bookings and availability.

5. **Admin Dashboard**:
   - Access detailed analytics, update car listings, and oversee system activity.

---

## Technologies Used

- **Frontend**: React, Tailwind CSS, DaisyUI
- **State Management**: React Query
- **Authentication**: Firebase Authentication, JWT
- **Data Visualization**: Recharts
- **Additional Libraries**: Axios, Framer Motion, SweetAlert2, React Hot Toast

---

## Installation & Setup

To run the project locally, follow these steps:

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Vite](https://vitejs.dev/)

### Steps
1. **Clone the repository**:
   ```bash
   git clone <repository-link>
   cd clint
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     VITE_API_URL=<Your API Endpoint>
     VITE_FIREBASE_API_KEY=<Your Firebase API Key>
     VITE_FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
     VITE_FIREBASE_PROJECT_ID=<Your Firebase Project ID>
     VITE_FIREBASE_STORAGE_BUCKET=<Your Firebase Storage Bucket>
     VITE_FIREBASE_MESSAGING_SENDER_ID=<Your Firebase Messaging Sender ID>
     VITE_FIREBASE_APP_ID=<Your Firebase App ID>
     ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`.

---

## Project Structure

```
clint/
├── src/
│   ├── components/         # Reusable components
│   ├── pages/              # Application pages
│   ├── hooks/              # Custom hooks
│   ├── services/           # API services
│   ├── styles/             # Global styles
│   ├── utils/              # Utility functions
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
└── vite.config.js          # Vite configuration
```

---

## License

This project is licensed under the **MIT License**. You are free to use and modify it as needed.

---

## Developer Contact

For inquiries or collaborations, contact:
- **Portfolio**: [sabbirhosen.netlify.app](https://sabbirhosen.netlify.app/)
- **Email**: [tssabbirhosen@gmail.com](mailto:tssabbirhosen@gmail.com)

