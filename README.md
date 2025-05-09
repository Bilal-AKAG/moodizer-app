# Moodizer AI 🌿

<div align="center">
  <img src="https://github.com/user-attachments/assets/034b703a-f110-46af-afd5-b2c57042e640" alt="Moodizer App" width="300"/>
  
  [![Frontend Repository](https://img.shields.io/badge/Frontend-Repository-blue)](https://github.com/Bilal-AKAG/moodizer-app)
  [![Backend Repository](https://img.shields.io/badge/Backend-Repository-green)](https://github.com/Bilal-AKAG/moodizer-api)
</div>

Moodizer AI is a full-stack application designed to help users track and improve their emotional well-being. It consists of a modern React Native mobile app frontend and a robust Node.js backend API.

## 🌟 Features

### Frontend Features
- **Intuitive User Interface**
  - Modern and clean design with smooth animations
  - Responsive layout that adapts to different screen sizes
  - Dark/Light mode support
  - Custom-designed components and icons

- **Authentication & Security**
  - Secure user registration and login flow
  - Biometric authentication support
  - JWT token management
  - Secure storage for sensitive data
  - Session management and auto-logout

- **Mood Tracking & Analytics**
  - Real-time mood logging with customizable categories
  - Interactive mood history visualization
  - Daily, weekly, and monthly mood trends
  - AI-powered mood insights and recommendations
  - Export mood data functionality

- **User Experience**
  - Offline support with data synchronization
  - Push notifications for mood check-ins
  - Haptic feedback for interactions
  - Gesture-based navigation
  - Accessibility features

- **Performance & Optimization**
  - Fast app loading and navigation
  - Optimized image loading and caching
  - Efficient state management
  - Minimal battery consumption
  - Reduced network usage

## 📱 UI Screenshots

### Authentication Screens
<div align="center">
  <img src="https://github.com/user-attachments/assets/2470efd5-a6b2-4939-82ce-3220f248deeb" alt="Login Screen" width="200"/>
  <img src="https://github.com/user-attachments/assets/89a88286-7ee9-41e0-9cbf-33ab7c2730ab" alt="Signup Screen" width="200"/>
</div>

### Main Features
<div align="center">
  <img src="https://github.com/user-attachments/assets/ff8e58f8-bf90-4947-9229-eb26e8570c09" alt="Main Entry" width="200"/>
  <img src="https://github.com/user-attachments/assets/2ccdb968-ef45-4613-a922-3b35addeca99" alt="History" width="200"/>
  <img src="https://github.com/user-attachments/assets/50634b3d-5f17-4fac-b30b-6570745dccc4" alt="Analysis" width="200"/>
</div>

### Additional Features
<div align="center">
  <img src="https://github.com/user-attachments/assets/a1ad1997-6362-45cb-9457-8000117217ba" alt="Favorites" width="200"/>
  <img src="https://github.com/user-attachments/assets/e2d55586-f0df-4344-b5bb-8fb220e35276" alt="Profile" width="200"/>
</div>

### Backend Features
- **User Management**
  - User registration and authentication
  - Secure login system
  - User profile management
  - Protected user routes

- **Mood Tracking**
  - Create new mood entries
  - View all mood entries
  - Get detailed mood entry by ID
  - Delete individual mood entries
  - Bulk delete mood entries

- **Favorites System**
  - Mark mood entries as favorites
  - View all favorite entries
  - Toggle favorite status

- **Data Validation & Security**
  - Input validation using Zod schemas
  - JWT-based authentication
  - Protected API endpoints
  - Secure password handling

## 🛠 Tech Stack

### Frontend
- React Native
- Expo Router
- React Native Safe Area Context
- Lucide React Native Icons
- Custom Fonts (Inter, Poppins)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT
- **AI Integration:** Google Gemini API
- **Environment Management:** dotenv
- **Validation:** Zod

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- PostgreSQL
- TypeScript
- iOS Simulator (for Mac) or Android Studio (for Android development)

## 🔧 Installation

### Frontend Setup

1. Clone the frontend repository:
```bash
git clone https://github.com/Bilal-AKAG/moodizer-app.git
cd moodizer-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan the QR code with Expo Go app on your physical device

### Backend Setup

1. Clone the backend repository:
```bash
git clone https://github.com/Bilal-AKAG/moodizer-api.git
cd moodizer-api
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL="postgresql://username:password@localhost:5432/moodizer?schema=public"
```

4. Set up the database:
```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## 📁 Project Structure

### Frontend Structure
```
moodizer-app/
├── app/
│   ├── (auth)/
│   ├── _layout.tsx
│   └── index.tsx
├── assets/
│   └── images/
└── ...
```

### Backend Structure
```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── helper/         # Helper functions
├── middlewares/    # Custom middlewares
├── routes/         # API routes
├── Service/        # Business logic
├── zodSchema/      # Zod validation schemas
├── prisma/         # Prisma schema and migrations
└── index.ts        # Application entry point
```

## 🔒 Security Features

- JWT-based authentication
- Protected routes using middleware
- Environment variable configuration
- CORS enabled for secure cross-origin requests
- Type-safe database operations with Prisma
- Input validation with Zod schemas

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

- **Name:** Bilal Ali
- **GitHub:** [@Bilal-AKAG](https://github.com/Bilal-AKAG)
- **Email:** bilal.ali.irp.dev@gmail.com

Feel free to reach out if you have any questions or suggestions!


