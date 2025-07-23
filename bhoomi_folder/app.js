

try {
  console.log("1. Starting app...");
  
  console.log("2. Requiring 'express'...");
  const express = require('express');
  
  console.log("3. Requiring 'path'...");
  const path = require('path');
  
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  
  console.log("4. Requiring home routes from './routes/home'...");
  const homeRoutes = require('./routes/homeroute');
  
  console.log("5. Requiring search routes from './routes/search'...");
  const searchRoutes = require('./routes/searchroute');
  
  console.log("6. All modules loaded successfully. Setting up routes...");
  
  app.use('/', homeRoutes);
  app.use('/', searchRoutes);
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

} catch (error) {
  console.error("error occured");
  console.error("The error happened after the last successful log message above.");
  console.error(error); 
}