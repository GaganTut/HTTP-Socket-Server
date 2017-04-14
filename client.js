/*jshint esversion: 6*/
const net = require('net');

const client = net.connect({port: 8080}, () => {
  console.log('connected');
});