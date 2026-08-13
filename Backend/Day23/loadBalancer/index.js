import express from "express";
import http from "http";
const app = express();
app.use(express.json());

const servers = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
];

let index = 0;

//   Round Robin
function getServer() {
  const server = servers[index];

  index = (index + 1) % servers.length;

  return server;
}

app.use((req, res) => {
  const server = getServer();

  const target = new URL(server);

  console.log(`Request ${req.method} ${req.url} → ${server}`);

  const proxyRequest = http.request(
    {
      hostname: target.hostname,
      port: target.port,
      method: req.method,
      path: req.url,
      headers: req.headers,
    },
    (proxyResponse) => {
      res.writeHead(proxyResponse.statusCode, proxyResponse.headers);

      // Backend response → Client
      proxyResponse.pipe(res);
    },
  );

  proxyRequest.on("error", (error) => {
    console.log("Backend error:", error.message);

    res.status(502).send("Backend server unavailable");
  });

  req.pipe(proxyRequest);
});
app.listen(3000, () => {
  console.log("load balancer running on port number 3000");
});
