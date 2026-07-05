//   portnumber/add/2/3    = 5
//   3000/mul/4/5
//   3000/div/24/4
//   3000/sub/25/5

// url me data aisa milega "/mul/4/5"  ise hum split kre lenege split krenge toh array ki form me ho jayga
//  ["" , "mul" , "4" , "5"];
//  phla empty string isliye aaya q ki sabse phle / toh kuch to daalana padega tph "" daal dega fir mul 4 5

const http = require("http");

const server = http.createServer((req, resp) => {
  const arr = req.url.split("/");
  console.log(arr);
  // q ki ["" , "mul" , "4" , "5"]
  //       0      1      2     3

  const operation = arr[1];
  const num1 = Number(arr[2]);
  const num2 = Number(arr[3]);

  if (isNaN(num1) || isNaN(num2)) {
    resp.end("inavlid number");
    return;
  }

  if (operation.length > 4) {
    resp.end("operation inavlid");
    return;
  }

  if (operation === "add") {
    resp.end(JSON.stringify(num1 + num2));
  } else if (operation === "sub") {
    resp.end(JSON.stringify(num1 - num2));
  } else if (operation === "mul") {
    resp.end(JSON.stringify(num1 * num2));
  } else if (operation === "div") {
    resp.end(JSON.stringify(num1 / num2));
  } else {
    resp.end("Invalid Url");
  }
});

server.listen(3000, () => {
  console.log("server is listening on port number 3000");
});
