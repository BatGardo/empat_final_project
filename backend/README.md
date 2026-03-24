⚙️ Baza Grunt Osnova Backend API
📌 Overview

This is the backend API for the Baza Grunt Osnova project — a web application designed to simplify the organization of group trips.

The backend is built using Laravel and provides a RESTful API for managing:

users and authentication
trips and participants
tasks and deadlines
collaboration between group members

It serves as the core of the system, handling business logic, data processing, and communication with the frontend.

🚀 Tech Stack
    Laravel (PHP)
    PostgreSQL
    REST API architecture

🏗️ Project Structure
The project mostly follows the default Laravel structure, which is commonly used for API-based applications :

    app/
    ├── Http/
    │    ├── Controllers   → API logic
    ├── Models             → database entities

    database/
    ├── factories          → factory methods
    ├── migrations         → schema definitions
    ├── seeders            → test data

    routes/
    ├── api.php            → API routes

💡 The backend logic is built using a classic approach:

    Controllers → handle incoming requests
    Models → interact with the database
    Routes → define the API endpoints

🔗 Core Functionality
    👤 Authentication
        User registration & login
        Token-based authentication (Sanctum)
    🌍 Trips
        Create and manage trips
        Add/remove participants
        Store trip-related data
    📋 Tasks
        Create tasks inside trips
        Assign tasks to users
        Track completion status
    ⏰ Deadlines
        Tasks can have due dates

🗄️ Database
    PostgreSQL (Render hosted)
    Managed via Laravel migrations

🔐 Authentication
    Token-based authentication for API access
    Secured endpoints using middleware

📦 Deployment
    Containerized with Docker
    Deployed on Render
    Connected to managed PostgreSQL instance

👨‍💻 Backend Team
    Ihor Syniaiev - Backend Developer / DevOps / Team Lead
    Uliana Sova - Backend Developer / Designer
