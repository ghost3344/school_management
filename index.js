const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
