const http2 = require('http2');
const fs = require('fs');
const args = process.argv.slice(2);
if(args.length!=3){
  console.log("Insert ip - port - number of requests ");
  process.exit(1);
}
const [ip, port, numberOfRequests] = process.argv.slice(2);


let address= 'https://'.concat(ip).concat(':').concat(port).concat('/');
console.log("Address ",address);
const client = http2.connect(address,{
  
  rejectUnauthorized: false,

} );

for (let i = 0; i < numberOfRequests; i++) {
  const req = client.request({ ':path': '/' });

  req.on('response', (headers, flags) => {
    console.log(headers[':status']);
  });
let data='';
  req.on('data', (chunk) => {
    data += chunk;
    console.log("Data Received");
  });

  req.on('end', () => {
    client.close();
  });
  
  req.end();
  
}
