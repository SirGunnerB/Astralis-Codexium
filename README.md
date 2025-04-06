# Astralis Codex

A powerful world-building and storytelling platform that helps creators bring their fantasy worlds to life.

![Astralis Codex Logo](client/public/logo192.png)

## 🌟 Features

- **World Management**
  - Create and manage multiple worlds
  - Customize world settings and visibility
  - Add tags and categories
  - Rich text descriptions

- **Character Builder**
  - Detailed character profiles
  - Relationship mapping
  - Character traits and abilities
  - Backstory and history tracking

- **Location Builder**
  - Interactive maps
  - Location descriptions
  - Connection between locations
  - Environmental details

- **Item Management**
  - Item cataloging
  - Custom properties
  - Ownership tracking
  - Item history

- **Timeline System**
  - Chronological event tracking
  - Multiple event types (birth, death, battle, discovery)
  - Event relationships
  - Visual timeline representation

- **User Features**
  - Secure authentication
  - Profile management
  - World sharing options
  - Export capabilities

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SirGunnerB/Astralis-Codexium.git
   cd Astralis-Codexium
   ```

2. Install dependencies:
   ```bash
   # Install server dependencies
   npm install

   # Install client dependencies
   cd client
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/astralis-codex
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   # From the root directory
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 🛠️ Tech Stack

- **Frontend**
  - React.js
  - Material-UI
  - Redux
  - React Router

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT Authentication

## 📁 Project Structure

```
astralis-codex/
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/               # Source files
│       ├── actions/       # Redux actions
│       ├── components/    # React components
│       ├── reducers/      # Redux reducers
│       └── pages/         # Page components
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── middleware/       # Express middleware
└── package.json          # Project dependencies
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start both client and server in development mode
- `npm run server` - Start only the server
- `npm run client` - Start only the client
- `npm run build` - Build the client for production

### Code Style

This project uses ESLint and Prettier for code formatting. Run the following commands to ensure code quality:

```bash
# Check for linting errors
npm run lint

# Format code
npm run format
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **SirGunnerB** - *Initial work* - [GitHub](https://github.com/SirGunnerB)

## 🙏 Acknowledgments

- Material-UI for the beautiful components
- MongoDB for the database
- All contributors who have helped shape this project

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Made with ❤️ by the Astralis Codex team 