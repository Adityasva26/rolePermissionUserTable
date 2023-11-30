const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Router
const userRouter = require('./userRouter');
app.use('/', userRouter);


mongoose.connect('mongodb://localhost:27017/testuser', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Other Express configurations and middleware...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
