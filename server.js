const fs = require('fs');
const path = require('path');
const express = require('express');
const strapi = require("@strapi/strapi");

const app = express();

// Serve static files from the React frontend app
const clientBuildPath = path.join(__dirname, 'client/build');
app.use(express.static(clientBuildPath));

// Serve static files from the Strapi public folder
const publicPath = path.join(__dirname, 'server/public');

// Check if publicPath exists
if (fs.existsSync(publicPath)) {
  console.log(`Public folder exists at: ${publicPath}`);
} else {
  console.error(`Public folder does not exist at: ${publicPath}`);
}

// Serve static files from the Strapi public folder
app.use(express.static(publicPath));

console.log(`Serving static files from ${clientBuildPath}`);
console.log(`Serving static files from ${publicPath}`);

// Additional logging for debugging
console.log("__dirname:", __dirname);
console.log("clientBuildPath:", clientBuildPath);
console.log("publicPath:", publicPath);

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Start Strapi
strapi({
  dir: path.resolve(__dirname, 'server'),
  appPath: path.resolve(__dirname, 'server'),
  staticPaths: {
    public: publicPath,
  },
})
  .start()
  .then(() => {
    console.log('Strapi server started successfully');
  })
  .catch((err) => {
    console.error('Strapi server failed to start', err);
  });
