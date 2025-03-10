# 🌍 Globetrotter - The Ultimate Travel Guessing Game!

Globetrotter is a full-stack web app where users get cryptic clues about a famous place and must guess the correct destination. Once they guess, they unlock fun facts, trivia, and surprises about the destination! Challenge yourself or your friends and test your travel knowledge! ✈️🏝️

---

## 🚀 Features

### 🧩 The Globetrotter Challenge
- Receive cryptic clues about famous destinations around the world.
- Select from multiple possible answers to guess the correct location.
- Unlock fun facts and trivia about each destination.

### 🔹 Core Functionality

#### 2️⃣ Functional Web App Features
- ✅ **Random Clues:** Display 1–2 random clues for a chosen destination.
- ✅ **Answer Selection:** Choose from multiple possible answers.
- ✅ **Immediate Feedback:**
  - 🎉 **Correct Answer:** Triggers an animated confetti effect and reveals a fun fact.
  - 😢 **Incorrect Answer:** Displays a sad-face animation and still reveals a fun fact.
- ✅ **Next Challenge:** A ‘Play Again’ or ‘Next’ button loads a new random destination.
- ✅ **Score Tracking:** Displays the total score, tracking correct and incorrect answers.
- 🔒 **Backend Security:** The dataset is stored on the backend to prevent users from accessing all answers via the browser.

#### 3️⃣ "Challenge a Friend" Feature
- ✅ **User Registration:**
  - Users enter a unique username before inviting friends.
  - This registers them in the system and creates their profile.
- ✅ **Invite Friends:**
  - Clicking ‘Challenge a Friend’ opens a share popup with a dynamic image & invite link for WhatsApp.
- ✅ **Invite Experience:**
  - The invited friend can see the invitee’s score before playing.
  - Anyone with the invitation link can play the game with full features.

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Next.js API Routes, Drizzle ORM
- **Google Gemini API** For Seeding
- **Hosting:** Vercel, Neon (PostgreSQL Database)

---

## 🚀 Getting Started

---

### 1️⃣ Installation  
Clone the repository:  
```sh
git clone https://github.com/Shubhayu-Bhowmick/Globetrotter.git
cd globetrotter
```  
Install dependencies:  
```sh
npm install
```  

---

### 2️⃣ Setup Environment Variables  
Create a `.env` file in the root directory and add:  
```env
DATABASE_URL=<your_database_url>
GEMINI_API_KEY=<your_google_gemini_api_key>
```  

---

### 3️⃣ Seed the Database  
You can now populate your database with fresh destinations using AI!  
Run the following command:  
```sh
npm run seed
```  
This will generate 5 new unique destinations every time you run it and store them in the database.  

---

### 4️⃣ Run the App  
Start the development server:  
```sh
npm run dev
```  
Visit `http://localhost:3000` to play the game! 🎉  

---


## 🤝 Contributing
1. Fork the repository
2. Create a new branch (`feature-new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-new-feature`)
5. Open a Pull Request

---

🌍 **Get ready to explore the world with Globetrotter!** 🌍

