# Note-Taking API
 
 A RESTful API for a simple note-taking application built with Node.js, Express, TypeScript, and MongoDB.
 
 ## Overview
 
 This API provides core functionality for managing notes including creating, retrieving, and deleting notes. Each note consists of a title, content, and automatically tracked timestamps.
 
 ## Features
 
 - **TypeScript Implementation**: Fully typed application with interfaces and type-safety
 - **MongoDB Integration**: Persistent storage using Mongoose ODM
 - **RESTful API Design**: Clean, consistent endpoint structure
 - **Error Handling**: Custom error classes with appropriate HTTP status codes
 - **API Documentation**: Interactive Swagger UI documentation
 - **Input Validation**: Data validation for creating and updating notes

## Technologies Used

- **Node.js** - JavaScript runtime for building server-side applications
- **Express.js** - Web framework for Node.js to handle API requests
- **MongoDB** - NoSQL database for storing notes and categories
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB
- **TypeScript** - Typed superset of JavaScript for enhanced code quality
- **Postman** - API testing tool
- **Joi** - Data validation library for request validation
- **Bcrypt** - Password hashing for authentication
- **jsonwebtoken** - JWT authentication for users
- **Dotenv** - Environment variable management


## Deployment

This API has been **deployed on Render** and is accessible at:

🚀 **Base URL:** 

## Project Implementation

###  Setting Up the Project

- Initialized a Node.js project using `npm init -y`
- Installed required dependencies: `express`, `mongoose`, `dotenv`, `cors`, `body-parser`, `joi`, `bcrypt`, `jsonwebtoken`
- Installed development dependencies: `typescript`, `ts-node`, `nodemon`, `@types/node`, `@types/express`
- Configured TypeScript in `tsconfig.json`

###  Creating the Server

- Set up an Express server in `app.ts and server.ts`
- Connected to MongoDB using Mongoose
- Implemented middleware for JSON parsing, CORS, validation, and logging
- Added authentication routes for user registration and login

###  Implementing Routes & Controllers

- Created `routes/note.route.ts` for handling note API endpoints
- Created `routes/category.route.ts` for handling category API endpoints
- Created `routes/auth.route.ts` for user authentication
- Implemented CRUD operations in `controllers/note.controller.ts`
- Defined the `Note` model using Mongoose in `models/note.model.ts`
- Defined the `Category` model in `models/category.model.ts`
- Defined the `User` model in `models/user.model.ts`

###  Adding Authentication

- Created `routes/auth.route.ts` for handling authentication endpoints
- Implemented `registerUser` and `loginUser` functions in `controllers/auth.controller.ts`
- Used **bcrypt** to hash passwords
- Used **jsonwebtoken (JWT)** for authentication
- Middleware to protect private routes

###  Implementing Middleware

- **Validation Middleware:** Ensures all requests contain the required fields before reaching the controllers (`noteValidationMiddleware.ts`)
- **Logging Middleware:** Logs all incoming requests (`loggerMiddleware.ts`)
- **Error Handling Middleware:** Handles application-wide errors (`errorMiddleware.ts`)


 ## API Documentation
 
 The API includes interactive documentation using Postman UI.
 
 - **Access URL**: `https://documenter.getpostman.com/view/28027423/2sAYk8tNMp`
 - **Features**:
   - Browse all available endpoints
   - See request/response schemas
   - Test API calls directly from your browser
   - View detailed parameter information
 
 To access the documentation:
 1. Start the application
 2. Open your browser
 3. Navigate to `https://documenter.getpostman.com/view/28027423/2sAYk8tNMp`

 ###  Testing with Postman

#### Authentication API Endpoints:

 | Method | Endpoint | Description |
 |--------|----------|-------------|
 | POST | `/api/users/register` | Registers a User |
 | POST | `/api/user/login` | Login the User |
 
 
 ## Category API Endpoints
 
 | Method | Endpoint | Description |
 |--------|----------|-------------|
 | GET | `/api/categories` | Retrieve all notes (sorted by last updated) |
 | GET | `/api/categories/:id` | Retrieve a specific note by ID |
 | POST | `/api/categories` | Create a new note |
 | DELETE | `/api/categories/:id` | Delete a note by ID |
 

  ## Note API Endpoints
 
 | Method | Endpoint | Description |
 |--------|----------|-------------|
 | GET | `/api/notes` | Retrieve all notes (sorted by last updated) |
 | GET | `/api/notes/:id` | Retrieve a specific note by ID |
 | POST | `/api/notes` | Create a new note |
 | DELETE | `/api/notes/:id` | Delete a note by ID |

 ## User

 Each user contains:

 - `username`: testuser,
 -  `email`: estuser@example.com,
 - `password`: password123

 ## Note Category
 
 Each note contains:
 
 - `_id`: Unique identifier (auto-generated)
 - `title`: Category title
 - `description`: Note content (required)
 - `color`: Note category color (custom/can be changed)
 - `categoryId`: Unique identifier (auto-generated)
 - `createdAt`: Timestamp of creation (auto-generated)
 - `updatedAt`: Timestamp of last update (auto-generated)
 

 ## Note Model
 
 Each note contains:
 
 - `_id`: Unique identifier (auto-generated)
 - `title`: Note title
 - `content`: Note content (required)
 - `description`: Note content (required)
 - `category`: Note category 
  - `categoryId`: Unique identifier (auto-generated)
 - `createdAt`: Timestamp of creation (auto-generated)
 - `updatedAt`: Timestamp of last update (auto-generated)

 ## Testing the Note-Taking API on Postman

### 1. Register a User

- Open **Postman**.
- Select **POST** request.
- Enter the endpoint:
- Go to the **Body** tab, select **raw**, and set the format to **JSON**.
- Add the following JSON:
  ```json
  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```
- Click **Send**.
- A successful response should return a message confirming registration.

### 2. Login a User

- Select **POST** request.
- Enter the endpoint: 
- Go to the **Body** tab, select **raw**, and set the format to **JSON**.
- Add the following JSON:
  ```json
  {
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```
- Click **Send**.
- A successful response returns a **JWT token**.
- Copy the **token** for authorization in subsequent requests.

### 3. Retrieve All Notes (Requires Authentication)

- Select **GET** request.
- Enter the endpoint: 
- Go to the **Headers** tab and add:
  - `Authorization`: `Bearer Token = "YOUR_JWT_TOKEN_HERE"`
- Click **Send**.
- If successful, a list of notes will be returned.

### 4. Create a New Note (Requires Authentication)

- Select **POST** request.
- Enter the endpoint: 
- Go to the **Headers** tab and add:
  - `Authorization`: `Bearer Token = "YOUR_JWT_TOKEN_HERE"`
- Go to the **Body** tab, select **raw**, and set the format to **JSON**.
- Add the following JSON:
  ```json
  {
    "title": "My First Note",
    "content": "This is the content of my note.",
    "categoryId": "category_id_here"
  }
  ```
- Click **Send**.
- If successful, the new note will be returned.

### 5. Retrieve a Single Note by ID

- Select **GET** request.
- Enter the endpoint: 
- Replace `:id` with the actual note ID.
- Add the authorization token in the **Headers**.
- Click **Send**.
- If successful, the requested note is returned.

### 6. Update a Note

- Select **PUT** request.
- Enter the endpoint: 
- Replace `:id` with the note ID.
- Add the authorization token in the **Headers**.
- Go to the **Body** tab, select **raw**, and set the format to **JSON**.
- Modify the note data and click **Send**.

### 7. Delete a Note

- Select **DELETE** request.
- Enter the endpoint: 
- Replace `:id` with the note ID.
- Add the authorization token in the **Headers**.
- Click **Send**.
- If successful, a confirmation message is returned.
 
 ## Prerequisites
 
 - Node.js (v14 or higher)
 - MongoDB (local instance or MongoDB Atlas)
 - npm or yarn
 
 ## Installation
 
 1. Clone the repository:
    ```bash
    git clone https://github.com/chukwunonsosylva17/learnableTask-week-11.git
    cd note-taking-api
    ```
 
 2. Install dependencies:
    ```bash
    npm install
    ```
 
 3. Create a `.env` file in the root directory with the following variables:
    ```
    PORT=8080
    MONGO_URI= mongodb+srv://<username>:<_dbpassword>@cluster0.lco2g.mongodb.net/
    *Note: Update the MONGO_URI as needed for your environment*
    CORS_ORIGIN=http://localhost:8080
    NODE_ENV=development
    JWT_SECRET=your_jwt_secret
 
 ## Running the Application
 
 ### Development Mode
 
 ```bash
 npm run dev
 ```
 
 This will start the server with hot-reloading enabled.
 
 ### Production Mode
 
 ```bash
 npm run build
 npm start
 ```

### NOTE

 The application will be available at `http://localhost:8080` ( the PORT specified in .env). <br>
 The API documentation is available at `https://documenter.getpostman.com/view/28027423/2sAYk8tNMp`
 
 ## API Usage Examples

 ### Create New Note
 
 ```
 POST /api/notes
 Content-Type: application/json
 ``` 

 ```json
 {
   "title": "Weekly Tasks",
   "content": "Complete API documentation and unit tests"
 }
 ```
Response:
```json
 {
   "_id": "67d033b0fda7d104e96bbb7b",
   "title": "Weekly Tasks",
   "content": "API documentation, API testing, Unit testing",
   "createdAt": "2025-03-11T12:59:28.972Z",
   "updatedAt": "2025-03-11T12:59:28.972Z"
}
```

 
 ### Get All Notes
 ```
 GET /api/notes
 ```

 Response: 
 ```json 
 {
    "status": "success",
    "results": 4,
    "data": {
        "notes": [
            {
                "_id": "67d033bcfda7d104e96bbb7d",
                "title": "Meeting Notes",
                "content": "Discuss project timeline and resource allocation",
                "createdAt": "2025-03-11T12:59:40.691Z",
                "updatedAt": "2025-03-11T12:59:40.691Z"
            },
            {
                "_id": "67d033b0fda7d104e96bbb7b",
                "title": "Weekly Tasks",
                "content": "API documentation, API testing, Unit testing",
                "createdAt": "2025-03-11T12:59:28.972Z",
                "updatedAt": "2025-03-11T12:59:28.972Z"
            },
            {
                "_id": "67d031cefda7d104e96bbb78",
                "title": "Groceries Shopping",
                "content": "Tomatoes, Apple, Bread, Vegetable oil",
                "createdAt": "2025-03-11T12:51:26.889Z",
                "updatedAt": "2025-03-11T12:51:26.889Z"
            },
            {
                "_id": "67d0253bfda7d104e96bbb69",
                "title": "First Note",
                "content": "This is my first note",
                "createdAt": "2025-03-11T11:57:47.212Z",
                "updatedAt": "2025-03-11T11:57:47.212Z"
            }
        ]
    }
}
```

### Get Note By ID

```
Get /api/notes/<note-id>
```
Response:
```json
{
    "status": "success",
    "data": {
        "note": {
            "_id": "67d0127ffda7d104e96bbb67",
            "title": "First Note",
            "content": "This is my first note",
            "createdAt": "2025-03-11T10:37:52.090Z",
            "updatedAt": "2025-03-11T10:37:52.090Z"
        }
    }
}
```

### PUT Update Note By ID

```
Put /api/notes/<note-id>
```
Response:
```json
{
    "status": "success",
    "data": {
        "note": {
            "_id": "67d0127ffda7d104e96bbb67",
            "title": "First Note",
            "content": "Tomatoes, Apple, Bread, Vegetable oil",
            "createdAt": "2025-03-11T10:37:52.090Z",
            "updatedAt": "2025-03-11T12:23:47.586Z"
        }
    }
}
```

 ### Delete Note
 
 ```
 DELETE /api/notes/67d0127ffda7d104e96bbb67 
 ```
 
 Response: Status 204 No Content
 
 ## Error Handling
 
 The API provides clear error messages with appropriate HTTP status codes:
 
 - `400 Bad Request`: Invalid input data
 - `404 Not Found`: Resource not found
 - `500 Internal Server Error`: Unexpected server errors
 
 Example error response:
 ```json
{
    "status": "fail",
    "message": "Note with ID 67d0127ffda7d104e96bbb67 not found"
}
 ```
 
 ## Project Structure
 
 ```
 learnableTask-week-11/
 ├── src/
 │   ├── config/                        // Database connection logics
 │   │   ├── db.ts                
 │   ├── controllers/                   // Route handler functions  
 │   │   ├── auth.controller.ts           
 │   │   ├── category.controller.ts          
 │   │   ├── index.controller.ts   
 │   │   └── note.controller.ts      
 │   ├── interfaces/                       // TypeScript interfaces
 │   │   ├── auth.interface.ts 
 │   │   ├── category.interface.ts          
 │   │   └── noteInterface.ts      
 │   ├── middleware/                         // Error handling middleware
 │   │   ├── authentication.middleware.ts           
 │   │   ├── categoryValidation.middleware.ts 
 │   │   ├── errorHAndler.middleware.ts
 │   │   ├── idCategoryValidation.middleware.ts 
 │   │   ├── logging.middleware.ts
 │   │   └── noteValidation.middleware.ts      
 │   ├── models/                            // Mongoose schema and model
 │   │   ├── category.model.ts            
 │   │   ├── note.model.ts     
 │   │   └── user.model.ts       
 │   ├── routes/                      // API route definitions
 │   │   ├── auth.routes.ts 
 │   │   ├── category.routes.ts 
 │   │   ├── index.route.ts     
 │   │   └── note.route.ts
 │   ├── services/                 // Services handle the business logic and database interactions.
 │   │   ├── auth.service.ts
 │   │   ├── category.service.ts 
 │   │   ├── note.service.ts
 │   │   └── type.service.ts
 │   ├── utils/                       // Custom error classes
 │   │   └── errorHandler.ts   
 │   ├── validations/                  // validation logics and schemas
 │   │   ├── auth.validation.ts 
 │   │   ├── category.validation.ts
 │   │   └── note.validation.ts 
 │   ├── app.ts                 // Express app setup
 │   └── server.ts              // Server entry point
 ├── .env                       // Environment variables
 ├── tsconfig.json              // TypeScript configuration
 └── package.json               // Project dependencies
 ```<br>

 ```
 ##  Adding Category Support

- Updated the `Note` model to include a `categoryId` field
- Modified the `createNote` and `updateNote` controllers to require `categoryId`
- Added a new endpoint to retrieve notes by category
- Implemented CRUD operations for categories
- Categories accept either an **ObjectId** reference to the `Category` model or a normal object with `name` and `description`

###  Implementing Middleware

- **Validation Middleware:** Ensures all requests contain the required fields before reaching the controllers (`noteValidationMiddleware.ts`)
- **Logging Middleware:** Logs all incoming requests (`loggerMiddleware.ts`)
 ``` <br>

```

###  Testing with Postman

#### Users Endpoints:

- **POST** `/api/users/register` - Registers a User 
- **POST** `/api/users/login` - Login a User

#### Notes Endpoints:

- **GET** `/api/notes` - Retrieve all notes
- **GET** `/api/notes/:id` - Retrieve a specific note
- **GET** `/api/notes/category/:categoryId` - Retrieve notes by category
- **POST** `/api/notes` - Create a new note (requires title, content, and categoryId in request body)
- **PUT** `/api/notes/:id` - Update a note (requires title, content, and categoryId in request body)
- **DELETE** `/api/notes/:id` - Delete a note

#### Category Endpoints:

- **GET** `/api/categories` - Retrieve all categories
- **GET** `/api/categories/:id` - Retrieve a specific category by ID
- **POST** `/api/categories` - Create a new category (requires `name` and `description` in request body)
- **PUT** `/api/categories/:id` - Update a category (supports partial updates for `name` and `description`)
- **DELETE** `/api/categories/:id` - Delete a category by ID
```<br>

```
## Postman API Structure

 ```
 - Notes API (Collection)
  ├── Users
  │   ├── Create User [POST]
  │   └── Login User [POST]
  ├── Categories
  │   ├── Create Category [POST]
  │   ├── Get All Category [GET]
  │   ├── Get A Category [GET]
  │   ├── Update Category [PUT]
  │   └── Delete Category [POST]
  ├── Notes
  │   ├── Create Note [POST]
  │   ├── Get All Notes [GET]
  │   ├── Get Note by ID [GET]
  │   ├── Update Note [PUT]
  │   └── Delete Note [DELETE]
  └── Environments
      └── Local Development
``` 

### Published Documentation

```

 Collection Details 

URL for published documentation: https://documenter.getpostman.com/view/28027423/2sAYkBtMp3 <br>

Collection name: Note Taking API <br>

Versions: CURRENT <br>

Environment: env <br>

SEO Title: Note Taking API With Category <br>

Description: My Learnable Task For The Week
```