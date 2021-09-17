const http = require('http');

const users = ['ironman', 'capamerica', 'blackwidow', 'hawkeye', 'hulksmash', 'godofthunder'];

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>My First Page</title></head>');
      res.write('<body><h1>Hello from my Node.js Server!</h1>');
      res.write(
          '<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
      );
      res.write('</html>');
      return res.end();
  }
  if (url === '/users') {
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>User List</title></head>');
      res.write('<body><h1>Registered Users</h1>');
      for (const user of users) {
        res.write(`<li>${user}</li>`);
      }
      res.write('</html>');
      return res.end();
  }
  if (url === '/create-user') {
      const body = [];
      req.on('data', chunk => {
          body.push(chunk);
      });
      req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          const username = parsedBody.split('=')[1];
          console.log(username);
          users.push(username)
      });
      res.statusCode = 302;
      res.setHeader('Location', '/users');
      res.end();
  }
});

