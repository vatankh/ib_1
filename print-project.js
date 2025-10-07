const fs = require('fs');
const path = require('path');

// List of files to display (relative to project root)
const filesToPrint = [
  // Configuration
  'package.json',
  '.env.example',
  '.eslintrc.json',

  // Main Application
  'src/app.js',
  'src/server.js',

  // Configuration
  'src/config/database.js',
  'src/config/index.js',

  // Models
  'src/models/User.js',
  'src/models/Post.js',
  'src/models/index.js',

  // Middleware
  'src/middleware/auth.js',
  'src/middleware/validation.js',

  // Controllers
  'src/controllers/authController.js',
  'src/controllers/dataController.js',
  'src/controllers/userController.js',

  // Routes
  'src/routes/auth.js',
  'src/routes/api.js',

  // Utilities
  'src/utils/jwt.js',

  // Key Scripts
  'src/scripts/seed.js',
  'src/scripts/test-phase2.js',

  // Tests
  'tests/app.test.js'
];

const printFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      console.log(`${filePath}:`);
      console.log(content);
      console.log('#############');
    } else {
      console.log(`${filePath}:`);
      console.log('FILE NOT FOUND');
      console.log('#############');
    }
  } catch (error) {
    console.log(`${filePath}:`);
    console.log(`ERROR READING FILE: ${error.message}`);
    console.log('#############');
  }
};

// Print all files
console.log('PROJECT FILES OUTPUT:\n');
filesToPrint.forEach(file => {
  printFile(file);
});

console.log('\nPROJECT STRUCTURE:');
console.log(`
secure-rest-api/
├── package.json
├── .env.example
├── .eslintrc.json
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── database.js
│   │   └── index.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── index.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dataController.js
│   │   └── userController.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── api.js
│   ├── utils/
│   │   └── jwt.js
│   └── scripts/
│       ├── seed.js
│       └── test-phase2.js
└── tests/
    └── app.test.js
`);
