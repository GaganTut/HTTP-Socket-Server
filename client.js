/*jshint esversion: 6*/
const net = require('net');
const fullUrl = process.argv[2];

const responseHeaders = [];

const connectClient = (host, port, path) => {
  console.log(host, port, path);
  const client = net.connect({host:host, port: port}, () => {
    client.write(`GET ${path} HTTP/1.1
Date: ${new Date().toUTCString()}
Host: ${client.remoteAddress}
User-Agent: Yooooooo`);
  });

  client.on('data', (data) => {
    const splitData = data.toString().split('\n\n');
    responseHeaders.push(data.toString().split('\n\n')[0]);
    process.stdout.write(splitData[splitData.length - 1]);
  });
};

if (fullUrl.indexOf(':') > -1 && fullUrl.indexOf('/') > -1) {
  var hostName = `http://${fullUrl.split(':')[0]}`;
  var portNum = fullUrl.split(':')[1].split('/')[0];
  var pathName = `/${fullUrl.split('/')[1]}`;

  connectClient(hostName, portNum, pathName);

} else if(fullUrl.indexOf(':') > -1) {
  var hostName = `http://${fullUrl.split(':')[0]}`;
  var portNum = fullUrl.split(':')[1];
  var pathName = '/';

  connectClient(hostName, portNum, pathName);

} else if (fullUrl.indexOf('/') > -1) {
  var hostName = `http://${fullUrl.split('/')[0]}`;
  var pathName = `/${fullUrl.split('/')[1]}`;

  connectClient(hostName, `80`, pathName);

} else if (fullUrl !== undefined) {
  var hostName = fullUrl;
  var pathName = '/';

  connectClient(hostName, 80, pathName);
} else {
  process.stdout.write(`Run client as such: 'node client.js hostname:port/path'`);
}