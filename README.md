It is a Monorepo Project.

/monorepo-root  
 ├── /web       → Frontend (React.js with Vite)  
 ├── /server    → Backend (Node.js with Express)  
 ├── README.md  → Project instructions  
 └── package.json  


1️⃣ Main Directory Setup
First, install the root-level dependencies by running:
npm install

2️⃣ Frontend Setup
Navigate to the "/web" directory and install the dependencies:
--> cd web
--> npm install

Tech Stack:
JavaScript
React.js with Vite
Zustand (State management)
Tailwind CSS (Styling)


3️⃣ Backend Setup
Navigate to the /server directory and install the dependencies:
--> cd server  
--> npm install

Tech Stack:
JavaScript
Node.js with Express.js
Sequelize (ORM)
MySQL (Database)


▶️ Running the Project from root directory
npm run dev 