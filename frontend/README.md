# 🚧 UNDER DEVELOPMENT 🚧

## 🚀 AutoJob AI

AutoJob AI is an **intelligent, full-stack job application automation platform** designed to simplify and accelerate the job-hunting process. By leveraging **AI, workflow automation, and a modern MERN-based architecture**, AutoJob AI helps users reduce repetitive work, apply smarter, and track applications efficiently in today’s competitive job market.

---

## 📌 Problem Statement

Job seekers spend countless hours:

* Searching for relevant job postings
* Repeatedly filling similar application forms
* Customizing resumes for each role
* Tracking application statuses manually

AutoJob AI solves these problems by **automating job discovery, application workflows, resume optimization, and tracking**, all from a single dashboard.

---

## ✨ Key Features

### 🤖 AI-Powered Job Matching

* Uses **Gemini AI** to analyze user profiles and resumes
* Matches candidates with relevant job opportunities
* Improves accuracy using skill, experience, and role similarity

### 🔁 Automated Application Workflows

* Integrates with **n8n** to automate:

  * Form submissions
  * Email follow-ups
  * Application status updates
* Reduces repetitive manual work

### 🧠 Dynamic Resume Optimization

* Tailors resume content dynamically for each job description
* Highlights relevant skills and experience automatically
* Increases ATS (Applicant Tracking System) compatibility

### 📊 Real-Time Application Dashboard

* Centralized dashboard to track:

  * Applied jobs
  * Application status (Applied, Interview, Rejected, Offer)
  * Follow-up reminders
* Clean and responsive UI built with **React & Tailwind CSS**

### 🎨 Smooth & Professional UX

* High-end animations using **GSAP** and **Framer Motion**
* Interactive and modern user experience
* Optimized for both desktop and mobile

---

## 🛠️ Tech Stack

### Frontend

* **Next.js / React.js**
* **Tailwind CSS**
* **GSAP & Framer Motion** for animations

### Backend

* **Node.js**
* **Express.js**

### Database

* **MongoDB** (MERN Stack)
* Optional: **Nhost** for backend services

### AI & Automation

* **Gemini API** – AI-powered job matching & resume optimization

---

## 🏗️ System Architecture (High-Level)

1. User uploads profile/resume
2. Gemini AI analyzes skills & experience
3. Job data is fetched and matched
4. Backend stores application data in MongoDB
5. Frontend dashboard displays real-time updates

---

## 🚀 Getting Started

### ✅ Prerequisites

* Node.js **v18+**
* npm or yarn
* Gemini API Key
* Stripe API Key
* MongoDB Atlas 

---

## 📥 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/AdithyanMS175/autojob-ai.git
cd autojob-ai
```

### 2️⃣ Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_mongodb_or_nhost_url
PORT=3000
```

---

## ▶️ Running the Application

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend (New Terminal)

```bash
cd client
npm run dev
```

Frontend runs on: **[http://localhost:5173](http://localhost:5173)**
Backend runs on: **[http://localhost:3000](http://localhost:3000)**

---



## 🤝 Contributing

Contributions make the open-source community stronger 🚀

1. Fork the repository
2. Create your feature branch

   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes

   ```bash
   git commit -m "Add AmazingFeature"
   ```
4. Push to the branch

   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

---

## 📄 License

Student Project So No License if you plan to use it just let me know!!
---

## 📬 Contact

**Adithyan M S**
GitHub: [[https://github.com/AdithyanMS175](https://github.com/AdithyanMS175/)]

Project Link: [[https://github.com/AdithyanMS175/AutoJob-AI](https://github.com/AdithyanMS175/AutoJob-AI/)]

LinkedIn Link: [[https://www.linkedin.com/in/adithyan-m-s-bb56b829a](https://www.linkedin.com/in/adithyan-m-s-bb56b829a)]
---

## 🌟 Future Enhancements

* Chrome extension for one-click apply
* LinkedIn & Indeed integration
* AI interview preparation module
* Analytics & success-rate insights

---

⭐ If you find this project useful, don’t forget to star the repository!