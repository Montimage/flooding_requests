const http2 = require('http2');
const fs = require('fs');
const args = process.argv.slice(2);
if(args.length!=3){
  console.log("Insert ip - port - number of requests ");
  process.exit(1);
}
const [ip, port, numberOfRequests] = process.argv.slice(2);


let address= 'http://'.concat(ip).concat(':').concat(port).concat('/');
console.log("Address ",address);
const client = http2.connect(address );

for (let i = 0; i < numberOfRequests; i++) {
  const req = client.request({ ':path': '/' });

  req.on('response', (headers, flags) => {
    console.log(headers[':status']);
  });

  req.on('data', (chunk) => {
    console.log("Data Received");
  });

  req.end();
}
