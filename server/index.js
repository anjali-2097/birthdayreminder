const express = require('express');
require('./db');
const userRouter = require('./routes/routes');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/static',express.static(path.join(__dirname,'/uploads')));
app.use(cors());
app.use(userRouter);

app.get('/', (req, res) => {
  res.send('<h2>This is from index.js file</h2>');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});