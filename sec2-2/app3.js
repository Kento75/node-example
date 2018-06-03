const http = require('http')
const fs = require('fs')

let request
let response

let server = http.createServer(getFromClient)

// main
server.listen(3000)
console.log('Server start!')

// func
function getFromClient(req, res) {
  request = req
  response = res
  fs.readFile('./index.html', 'UTF-8', writeToResponse)
}

// writeToResponse
function writeToResponse(error, data) {
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.write(data)
  response.end()
}
