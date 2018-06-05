const http = require('http')
const fs = require('fs')
const ejs = require('ejs')
const url = require('url')

const index_page = fs.readFileSync('./index.ejs', 'UTF-8')
const other_page = fs.readFileSync('./other.ejs', 'UTF-8')
const style_css = fs.readFileSync('./style.css', 'UTF-8')

let server = http.createServer(getFromClient)

// main
server.listen(3000)
console.log('Server start!')

// func
function getFromClient(request, response) {
  let url_parts = url.parse(request.url)
  let content = null

  switch(url_parts.pathname) {
    case '/':
      content = ejs.render(index_page, {
        title: 'Indexページ',
        content: 'サンプルEJS',
      })
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.write(content)
      response.end()
      break

    case '/other':
      content = ejs.render(other_page, {})
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.write(content)
      response.end()
      break

    case '/style.css':
      response.writeHead(200, {'Content-Type': 'text/css'})
      response.write(style_css)
      response.end()
      break
    
    default:
      response.writeHead(200, {'Content-Type': 'text/css'})
      response.end('no page ...')
      break
  }

}
