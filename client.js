/*jshint esversion: 6*/
const net = require('net');
const fullUrl = process.argv[2];

const hostName = fullUrl.split(":")[0] || null;
const portNum = fullUrl.split(":")[1].split("/")[0] || null;
const pathName = `/${fullUrl.split("/")[1]}` || null;

const responseHeaders = [];
if (hostName === undefined) {
  process.stdout.write(`Type path as such: "node client.js localhost:8080/sample"`);
} else {
  const client = net.connect({host: hostName, port: portNum}, () => {
    if (pathName === undefined) {
      process.stdout.write(`Type path as such: "node client.js localhost:8080/sample"`);
    } else {
      client.write(`GET ${pathName} HTTP/1.1
Date: ${new Date().toUTCString()}
Host: ${client.remoteAddress}
User-Agent: Yooooooo`);
    }
    client.on('data', (data) => {
      const splitData = data.toString().split('\n\n');
      responseHeaders.push(data.toString().split('\n\n')[0]);
      process.stdout.write(splitData[splitData.length - 1]);
    });
  });
}