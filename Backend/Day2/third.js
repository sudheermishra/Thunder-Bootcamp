//         query String url
//         add ? num1=23 & num2=45
//         mul ? num1=23 & num2=45
//         div ? num1=23 & num2=45

//        agar yeh object me convert ho jaye    (url.parse object me convert kr dega)

//       {
//            pathname : "/add",
//            query:{
//                   num1: '23',
//                   num2: '45'
//                  }
//        }

const http = require("http");
const url = require("url");

const server = http.createServer((req, resp) => {
  // url.parse hume isko object me convert krke de dega

  const parsed = url.parse(req.url, true);
  const pathName = parsed.pathname.slice(1);
  const num1 = Number(parsed.query.num1);
  const num2 = Number(parsed.query.num2);

  if (pathName === "add") {
    resp.end(JSON.stringify(num1 + num2));
  } else if (pathName === "sub") {
    resp.end(JSON.stringify(num1 - num2));
  } else if (pathName === "mul") {
    resp.end(JSON.stringify(num1 * num2));
  } else if (pathName === "div") {
    resp.end(JSON.stringify(num1 / num2));
  } else {
    resp.end("Invalid Url");
  }
});

server.listen(3000, () => {
  console.log("server is listening on port number 3000");
});
