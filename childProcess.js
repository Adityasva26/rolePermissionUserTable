const { spawn, fork } = require('child_process');

// Spawning a child process to execute a shell command
const ls = spawn('ls', ['-lh', '/usr']);
ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});
ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});
ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

// Forking a child process to perform a CPU-intensive task
const compute = fork('./compute.js');
compute.send({ num: 1000000 });
compute.on('message', (result) => {
    console.log(`Computed result: ${result}`);
});
