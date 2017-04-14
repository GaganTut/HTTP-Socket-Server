/*jshint esversion: 6*/
const net = require('net');
const fullUrl = process.argv[2];

const hostName = fullUrl.split(":")[0];
const portNum = fullUrl.split(":")[1].split("/")[0];
const pathName = `/${fullUrl.split("/")[1]}`;

console.log(hostName, portNum, pathName);
if (hostName === undefined) {
  process.stdout.write(`Type path as such: "node client.js localhost:8080/sample"`);
} else {
  const client = net.connect({host: hostName, port: portNum}, () => {
    if (pathName === undefined) {
      process.stdout.write(`Type path as such: "node client.js localhost:8080/sample"`);
    } else {
      console.log(pathName);
      client.write(`GET ${pathName} HTTP/1.1`);
    }

    client.on('data', (data) => {
      const splitData = data.toString().split('\n\n');
      process.stdout.write(splitData[splitData.length - 1]);
    });
  });
}
