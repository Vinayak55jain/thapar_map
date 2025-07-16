const exprees = require('express');
const app = exprees();
const { PrismaClient } = require( '@prisma/client');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
