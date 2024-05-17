const express = require('express');
const mongoose = require('mongoose');
const Redis = require('ioredis');
const { spawn, fork } = require('child_process');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/testuser', {
  useNewUrlParser: true,
  // Remove the deprecated option
  // useUnifiedTopology: true,
});

// Redis connection
const redis = new Redis({
  port: '6379',
  host: '127.0.0.1',
});

redis.on('connect', () => {
  console.log('Connected to Redis...');
});

redis.on('error', (err) => {
  console.log('Redis error: ', err);
});

// Spawning and forking child processes
const command = os.platform() === 'win32' ? 'dir' : 'ls';
const args = os.platform() === 'win32' ? [] : ['-lh', '/usr'];

const ls = spawn(command, args);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

ls.on('error', (err) => {
  console.error(`Failed to start child process: ${err.message}`);
});

const compute = fork('./compute.js');
compute.send({ num: 1000000 });

compute.on('message', (result) => {
  console.log(`Computed result: ${result}`);
});

compute.on('error', (err) => {
  console.error(`Failed to fork child process: ${err.message}`);
});

// Router
const userRouter = require('./userRouter');
app.use('/', userRouter(redis));

// Other Express configurations and middleware...
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
