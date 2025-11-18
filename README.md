# 📝 Serverless Notes App  
*A cloud-native notes application built with AWS Amplify, React, GraphQL, DynamoDB, and Cognito.*

---

## Overview

The **Serverless Notes App** is a fully serverless, secure, and scalable web application that allows authenticated users to create, view, edit, and delete notes. It is built with **React** on the frontend and **AWS Amplify** for backend services such as authentication, a GraphQL API, data storage, and hosting.

This project demonstrates modern **serverless architecture**, **authentication**, **GraphQL data operations**, and **full-stack deployment** on AWS.

---

## Architecture

```text
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
