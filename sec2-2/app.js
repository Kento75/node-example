const http = require('http')
// ファイル操作用パッケージ
const fs = require('fs')


let server = http.createServer(
  (request, response) => {
    fs.readFile('./index.html', 'UTF-8', (error, data) => {
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.write(data)
      response.end()
    })
  }
)

server.listen(3000)
console.log('Server start!')
