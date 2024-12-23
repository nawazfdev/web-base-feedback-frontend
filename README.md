# Web-Based Feedback Tool (Frontend)

## Overview
This is the frontend repository for the **Web-Based Feedback Tool**. It is built using **Vue.js** and provides an interface for users to submit feedback, comment on feedback, and view detailed information about feedback and comments. The backend for this project is developed in Laravel Sanctum and is available in a separate repository.

## Features
- **User Authentication**:
  - Login
  - Registration
  - Logout
- **Feedback Management**:
  - Submit new feedback
  - View all feedback
  - Delete feedback
- **Comments**:
  - Add comments to feedback
  - View comments with user details (name and date)
- **Feedback Details**:
  - Show feedback submitter information
  - Show commenter information with timestamps

## Prerequisites
- **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js Official Website](https://nodejs.org/).
- **Vue CLI**: Install Vue CLI globally if not already installed.

  ```bash
  npm install -g @vue/cli
  ```

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/nawazfdev/web-base-feedback-frontend.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd web-base-feedback-frontend
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

 
4. **Run the Development Server**:

   ```bash
   npm run serve
   ```

5. **Access the Application**:
   - Open your browser and navigate to `http://localhost:8080` (default Vue.js dev server port).

## Build for Production

To build the project for production, run:

```bash
npm run build
```
The production-ready files will be generated in the `dist/` directory.

## API Endpoints
The frontend communicates with the Laravel backend through the following endpoints:

### Authentication
- **POST** `/login` - User login
- **POST** `/register` - User registration
- **POST** `/logout` - User logout

### Feedback
- **GET** `/feedback` - List all feedback
- **POST** `/feedback` - Create new feedback
- **DELETE** `/feedback/:id` - Delete feedback

### Comments
- **GET** `/feedback/:id/comments` - List comments for a specific feedback
- **POST** `/feedback/:id/comments` - Add a new comment to a specific feedback

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes.
   ```bash
   git commit -m "Add feature name"
   ```
4. Push your branch.
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.
For any questions or issues, please feel free to open an issue on the GitHub repository.
contact me here sardarnawaz122@gmail.com

