# 📝 Serverless Notes App  
*A cloud-native notes application built with AWS Amplify, React, GraphQL, DynamoDB, and Cognito.*

## 📌 Overview

The **Serverless Notes App** is a fully serverless, secure, and scalable web application that allows authenticated users to create, view, edit, and delete notes. It is built using **React** on the frontend and **AWS Amplify** to manage backend services such as authentication, GraphQL API, data storage, and hosting.

This project demonstrates modern **serverless architecture**, **authentication**, **GraphQL data operations**, and **full-stack deployment** on AWS.

---

## 🏗️ Architecture



React Frontend (Amplify Hosting)
│
▼
AWS Amplify
│
▼
Amazon Cognito (Auth)
│
▼
AppSync GraphQL API
│
▼
DynamoDB Table (Notes)


---

## ✨ Features

### 🧾 Core Functionality
- Create new notes  
- View existing notes  
- Edit/update notes  
- Delete notes  
- Responsive UI built with React  

### 🔐 Authentication
- Secure signup, login, logout using **Cognito User Pools**

### 🌐 API & Data Layer
- **GraphQL API** powered by AppSync  
- Auto-generated resolvers & DynamoDB integration  
- Real-time data queries  

### 🚀 Deployment
- Deployed using **AWS Amplify Hosting**  
- Automatic CI/CD triggered by GitHub commits  

---

## 🛠️ Tech Stack

**Frontend**
- React  
- AWS Amplify  
- Amplify UI Components  
- GraphQL  

**Backend**
- AppSync  
- DynamoDB  
- Cognito User Pools  
- IAM Roles  

**Other**
- Node.js  
- NPM  
- GitHub  

---

## 📂 Project Structure



root/
├── amplify/
│ ├── backend/
│ │ ├── api/
│ │ ├── auth/
│ │ ├── storage/
│ │ └── function/
├── src/
│ ├── components/
│ │ ├── NoteCard.jsx
│ │ ├── CreateNoteForm.jsx
│ │ └── NotesList.jsx
│ ├── graphql/
│ │ ├── mutations.js
│ │ ├── queries.js
│ │ ├── subscriptions.js
│ ├── App.js
│ └── index.js
├── package.json
└── README.md


---

## 🚀 Running Locally

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
amplify pull
npm start

🔐 Security Considerations

All endpoints require Cognito authentication.

IAM roles follow the least-privilege principle

No secrets or credentials are committed to GitHub.

📊 Monitoring

CloudWatch logs for backend activity

Amplify Console for build & deployment logs

KNOWN LIMITATIONS

Notes are text-only (no attachments yet)

No search or filter options

Basic UI styling

FUTURE ENHANCEMENT

File uploads via S3

Search & filter functionality.

Tags/categories

Offline support with Amplify DataStore

Author

Blessing Ntekim
Cloud / AWS | React | Serverless
LinkedIn: https://linkedin.com/in/ntekimblessing

Email: ntekimblessing@gmail.com
