process.on('message', (msg) => {
    const { num } = msg;
    let result = 0;
    for (let i = 0; i <= num; i++) {
        result += i;
    }
    process.send(result);
});
