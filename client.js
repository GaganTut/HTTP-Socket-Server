/*jshint esversion: 6*/
const net = require('net');
const path = process.argv[2] || '/';

const client = net.connect({port: 8080}, () => {
  client.write(`GET ${path} HTTP/1.1`);

  client.on('data', (data) => {
    const splitData = data.toString().split('\n\n');
    process.stdout.write(splitData[splitData.length - 1]);
  });
});
