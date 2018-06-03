const http = require('http')
const fs = require('fs')
const ejs = require('ejs')

const index_page = fs.readFileSync('./index.ejs', 'UTF-8')

let server = http.createServer(getFromClient)

// main
server.listen(3000)
console.log('Server start!')

// func
function getFromClient(request, response) {
  let content = ejs.render(index_page, {
    title: 'Indexページ',
    content: 'サンプルEJS',
  })
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.write(content)
  response.end()
}
