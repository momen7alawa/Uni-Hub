# UNIHub - University Tool Exchange Platform

A modern web platform that connects university students to exchange old school supplies, tools, and equipment. Built with React and powered by a JSON-based backend, UNIHub promotes sustainability and helps students save money by giving their unused items a second life.

## Overview

UNIHub is a peer-to-peer exchange platform designed specifically for university students. Whether you have lab equipment, architecture tools, electronics components, or chemistry supplies you no longer need, UNIHub makes it easy to connect with fellow students who are looking for exactly what you have.

## Features

### Core Functionality
- **User Authentication**: Secure registration and login system with persistent sessions
- **Tool Listing**: Add your unused tools and equipment with images, descriptions, and categories
- **Browse & Search**: Explore available items by category (Architecture, Chemistry, Electrical, Lab Kits)
- **Exchange Requests**: Send direct messages to tool owners with meeting place suggestions
- **Notifications Inbox**: Receive and manage exchange requests from other students
- **Protected Routes**: Secure pages that require authentication

### User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Image Upload**: Base64 image encoding for tool listings (no server-side file handling needed)
- **Real-time Updates**: Dynamic content loading and state management
- **Email Integration**: Reply to exchange requests via mailto links (client-side)
- **Statistics Counter**: Track platform activity and engagement
- **Testimonials**: Community feedback and success stories

## Tech Stack

### Frontend
- **React 19.2.0**: Modern UI library with hooks
- **React Router DOM 7.9.6**: Client-side routing and navigation
- **Vite 7.2.2**: Fast build tool and development server
- **Bootstrap 5.3.8**: Responsive CSS framework
- **Bootstrap Icons 1.13.1**: Icon library
- **React Icons 5.5.0**: Additional icon components

### Backend
- **JSON Server 0.17.4**: RESTful API with JSON database (includes built-in CORS)
- **Node.js**: Server runtime

### Development Tools
- **ESLint**: Code linting and quality
- **SWC**: Fast JavaScript/TypeScript compiler
- **Vite Plugin React**: React integration for Vite

## Project Structure

```
graduatin_project/
├── public/
│   ├── assets/
│   │   └── logo.svg
│   └── images/              # Product images
├── src/
│   ├── components/          # Reusable UI components (PageTitle, StatsCounter, TeamGrid, Testimonials)
│   ├── css/                 # Stylesheets (Home.css, Login.css, Contact.css)
│   ├── img/                 # Static images and backgrounds
│   ├── Main-Page-Components/
│   ├── Registeration-Components/
│   ├── AddTool.jsx          # Tool listing form
│   ├── App.jsx              # Main app component
│   ├── AuthContext.jsx      # Authentication context
│   ├── ExchangePage.jsx     # Exchange request page
│   ├── Header.jsx           # Navigation header
│   ├── Notifications.jsx    # User inbox
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── db.json                  # JSON database
├── server.js                # Backend server
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── .env                     # Environment variables

```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd graduatin_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3001
   ```

4. **Email functionality**
   Email replies work through mailto links that open the user's default email client. No server-side email configuration required.

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run server
   ```
   Server runs on `http://localhost:3001`

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173` (or next available port)

### Production Build

```bash
npm run build
npm run preview
```

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start JSON Server backend
- `npm run lint` - Run ESLint

## API Endpoints

### Items (Tools/Equipment)
- `GET /items` - Fetch all items
- `GET /items?class=<category>` - Filter by category
- `POST /items` - Add new item
- `PUT /items/:id` - Update item
- `DELETE /items/:id` - Delete item

### User Accounts
- `GET /accounts` - Fetch all accounts
- `GET /accounts?email=<email>` - Find by email
- `POST /accounts` - Register new user
- `PUT /accounts/:id` - Update account

### Exchange Messages
- `GET /exchangeMessages` - Fetch all messages
- `GET /exchangeMessages?owner=<username>` - Filter by recipient
- `POST /exchangeMessages` - Send exchange request

### Image Handling
- Images are handled client-side using Base64 encoding
- No server-side file upload endpoints needed

### Email Integration
- Email functionality uses mailto links (client-side)
- No server-side email endpoints needed

## Database Schema

### Items Collection
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "class": "string",
  "owner": "string",
  "imageURL": "string",
  "price": "number",
  "createdAt": "ISO date string"
}
```

### Accounts Collection
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "createdAt": "ISO date string"
}
```

### Exchange Messages Collection
```json
{
  "id": "string",
  "productId": "string",
  "productTitle": "string",
  "productImage": "string",
  "owner": "string",
  "senderName": "string",
  "senderEmail": "string",
  "meetingPlace": "string",
  "message": "string",
  "createdAt": "ISO date string",
  "read": "boolean"
}
```

## Key Features Explained

### Authentication System
- Uses React Context API for global state management
- Stores user session in localStorage
- Protected routes redirect to login when unauthenticated
- Persistent login across page refreshes

### Tool Listing
- Base64 image encoding for direct storage in JSON (no file server needed)
- Category-based organization
- Owner attribution for each listing
- Timestamp tracking

### Exchange System
- Direct messaging between users (stored in JSON database)
- Meeting place suggestions
- Email integration via mailto links (opens user's email client)
- Inbox notification system

## Categories

- **Architecture**: Compasses, rulers, drawing tools, pencils
- **Chemistry**: Test tubes, flasks, pipettes, lab equipment
- **Electrical**: Arduino boards, breadboards, resistors, multimeters, jumper wires
- **Lab Kits**: General laboratory equipment and supplies

## Architecture Highlights

### Simplified Backend
- **No file uploads**: Images stored as Base64 strings directly in JSON
- **No email server**: Uses mailto links for client-side email handling
- **Built-in CORS**: JSON Server provides CORS automatically
- **Zero configuration**: Single JSON file serves as complete database

### Lightweight Design
- **Minimal dependencies**: Only essential packages included
- **Fast development**: JSON Server provides full REST API instantly
- **Easy deployment**: Single server file with embedded database
- **Client-side heavy**: Most functionality handled in React frontend

## Security Considerations

⚠️ **Important**: This is a development/educational project. For production use:

1. Implement proper password hashing (bcrypt, argon2)
2. Add JWT or session-based authentication
3. Use HTTPS for all communications
4. Implement rate limiting
5. Add input validation and sanitization
6. Use environment variables for sensitive data
7. Implement proper CORS policies
8. Add CSRF protection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This appears to be a graduation project. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Please check with the project owner for licensing information.

## Contact & Support

For questions or support, please contact the project maintainers.

## Recent Updates

### Code Cleanup (Latest)
- **Removed unused dependencies**: Eliminated Nodemailer, CORS, and Multer packages
- **Simplified image handling**: Uses Base64 encoding instead of file uploads
- **Streamlined email**: Uses mailto links instead of server-side email sending
- **Cleaned components**: Removed unused Newsletter and VideoModal components
- **Optimized bundle**: Reduced node_modules size by ~3MB
- **Maintained functionality**: All features work exactly the same with cleaner code

### Benefits
- ✅ Faster installation and deployment
- ✅ Fewer security concerns (no email credentials to manage)
- ✅ Simpler architecture (client-side heavy approach)
- ✅ Better maintainability (less unused code)
- ✅ Same user experience with cleaner backend

## Acknowledgments

- Built as a graduation project
- Designed to promote sustainability in university communities
- Inspired by the need for affordable student resources

---

**Mission Statement**: "Give your old school supplies a new life and find what you need. Join our community to save money, support sustainability, and easily find everything you need for the academic year from your peers."
