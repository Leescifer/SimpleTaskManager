# Express JS + Mongo DB (REST API) Activity

Create a simple Task Manager API implementing CRUD functionality.

The twist is:
1. Each task will have a status (pending, in-progress, completed).
2. Users can search tasks by keyword (title/description).
3. Users can filter tasks by status.

# NERN Stack Application 
This is NERN application that uses MongoDB, Express, Next.js, and Node.js.

# Tools   
Axios

## 🚀 Getting Started

Follow these instructions to set up the project locally:

### 📦 Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```
### 📁 Install Dependencies

#### For the backend
```bash
cd server 
npm install
```

#### For the client
```bash
cd client 
npm install
```
#### Configure Environment Variables
Create a .env file in the client and server directory and add the following variables. Modify the values as needed.

Server
```bash
MONGO_URI=</your mongo string>
PORT=</your port> 
```
Client
```bash
NEXT_PUBLIC_API_URL=http:<?server url>
```

## Run the Application in development mode

Start both the backend and frontend servers.

### Backend

Navigate to the project root directory and start the backend server.

```sh
cd backend/
npm run dev
```

### Frontend

Navigate to the `client` directory and start the frontend server.

```sh
cd client/
npm run dev
```

# Thank you!



