import http from 'http';

const server = http.createServer((req, res) => {
  res.statusCode = 200; // Set HTTP status
  res.setHeader('Content-Type', 'text/plain'); // Set response headers
  res.end('Hello, World!'); // Send the response body and end the response
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
