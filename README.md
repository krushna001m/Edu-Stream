
# Edu-Stream 🎓📚

---
## 🌍 Live Demo
👉 [**View**](https://v0-complete-project-build.vercel.app/)  

---

## 🚀 Features
- 🎥 High-quality video streaming for lessons
- 📝 Interactive quizzes after each lesson
- 📈 Progress tracking for each student
- 🔐 Secure user authentication (Signup/Login)
- 🗄️ Cloud-based data storage for lessons and progress
- 📱 Responsive and student-friendly UI

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Tailwind CSS (for styling)

### Backend:
- Node.js
- Express.js

### Database:
- MongoDB (Mongoose ORM)

### Other Tools:
- Firebase or AWS S3 (for video storage)
- JWT (JSON Web Tokens) for Authentication
- Multer (for file uploads)

---

## 📂 Project Structure

```
Edu-Stream/
├── client/         # React Frontend
│   ├── public/
│   ├── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.js
│       └── index.js
├── server/         # Node.js Backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── README.md
├── package.json
└── .gitignore
```

---

## 🔥 Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/krushna001m/Edu-Stream.git
   cd Edu-Stream
   ```

2. **Install Frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up Environment Variables**
   - Create `.env` file in the `server` folder:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_URL=your_cloud_storage_url (optional)
     ```

5. **Run the application**
   - Start Backend
     ```bash
     cd server
     npm run dev
     ```
   - Start Frontend
     ```bash
     cd client
     npm start
     ```

---

## 📣 Contributing

Pull requests are welcome.  
For major changes, please open an issue first to discuss what you would like to change.

---

## 🙌 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Node.js Documentation](https://nodejs.org/en/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)

---
