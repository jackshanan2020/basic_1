const http = require ('http');
const fs   = require ('fs');
const path = require ('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;

    if (filePath === './') {
        filePath = './index.html'; // Default page
      }

      filePath = path.resolve(filePath);

      fs.readFile(filePath, (err, content) => {
        if (err) {
          if (err.code === 'ENOENT') {
            res.writeHead(404);
            res.end('404 Not Found');
          } else {
            res.writeHead(500);
            res.end('500 Internal Server Error');
          }
        } else {
          let contentType = 'text/html';
    
          // Set content type based on file extension
          if (filePath.endsWith('.js')) {
            contentType = 'text/javascript';
          } else if (filePath.endsWith('.css')) {
            contentType = 'text/css';
          }
    
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    });
    
    const PORT = 3000;
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });