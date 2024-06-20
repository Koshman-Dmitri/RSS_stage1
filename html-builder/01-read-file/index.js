const path = require('path');
const fs = require('fs');

const myPath = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(myPath, 'utf-8');

readableStream.on('data', (chunk) => console.log(chunk));
