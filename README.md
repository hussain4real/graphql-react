# Event Booking Application

A full-stack event booking application built with Node.js, Express, GraphQL, and React. This application allows users to browse events, make bookings, and manage their reservations.

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **GraphQL** - Query language and API
- **Apollo Server** - GraphQL server implementation

### Frontend
- **React** - Frontend library
- **Apollo Client** - GraphQL client
- **React Router** - Client-side routing

### Database
- **MongoDB** / **PostgreSQL** (specify your choice)

## 📋 Features

- Browse available events
- User authentication and authorization
- Event booking and cancellation
- User dashboard for managing bookings
- Admin panel for event management
- Real-time updates

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB/PostgreSQL (depending on your database choice)

### Backend Setup

```bash
# Clone the repository
git clone <repository-url>
cd graphql-react

# Install backend dependencies
cd backend
npm install

# Create environment variables
cp .env.example .env
# Edit .env with your database credentials and other config

# Start the backend server
npm run dev
```

### Frontend Setup

```bash
# Install frontend dependencies
cd frontend
npm install

# Start the React development server
npm start
```

## 📁 Project Structure

```
graphql-react/
├── backend/
│   ├── src/
│   │   ├── schema/
│   │   │   ├── typeDefs.js
│   │   │   └── resolvers.js
│   │   ├── models/
│   │   ├── middleware/
│   │   └── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── graphql/
│   │   ├── utils/
│   │   └── App.js
│   ├── public/
│   └── package.json
└── README.md
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```
PORT=4000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## 📚 API Documentation

### GraphQL Endpoint
- **Development**: `http://localhost:4000/graphql`
- **GraphQL Playground**: Available in development mode

### Main Types
- **User**: User account information
- **Event**: Event details and metadata
- **Booking**: Booking information linking users and events

### Sample Queries

```graphql
# Get all events
query {
  events {
    id
    title
    description
    date
    price
    availableSlots
  }
}

# Create a booking
mutation {
  createBooking(eventId: "123", userId: "456") {
    id
    event {
      title
    }
    user {
      email
    }
  }
}
```

## 🚦 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Users can:
- Register new accounts
- Login with email/password
- Access protected routes with valid tokens

## 🚀 Deployment

### Backend Deployment
1. Set up your production database
2. Configure environment variables
3. Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment
1. Update API endpoints for production
2. Build the React app: `npm run build`
3. Deploy to static hosting (Netlify, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions, please contact [your-email@example.com]
