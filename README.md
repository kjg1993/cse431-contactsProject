# 📇 Contacts API - Part 1

![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)
![Express](https://img.shields.io/badge/Express-4.x-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen.svg)
![Render](https://img.shields.io/badge/Deployed-Render-purple.svg)

A RESTful API for managing contacts, built with Node.js, Express, and MongoDB. This is **Part 1** of a two-week project, focusing on setting up the database and implementing GET endpoints.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features (Part 1)](#features-part-1)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Endpoints (Part 1)](#api-endpoints-part-1)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Next Steps (Part 2)](#next-steps-part-2)

## 🚀 Project Overview

This API provides endpoints for storing and retrieving contact information. Built as the foundation for a contact management system, it currently supports retrieving contacts from a MongoDB database. All interactions happen through the API, making it ready to be consumed by any frontend application.

## ✨ Features (Part 1)

- ✅ MongoDB database connection
- ✅ Contact data imported into database
- ✅ GET all contacts endpoint
- ✅ GET single contact by ID endpoint
- ✅ Deployed to Render

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Deployment:** Render
- **Version Control:** Git/GitHub

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kjg1993/cse431-contactsProject.git
   cd cse431-contactsProject