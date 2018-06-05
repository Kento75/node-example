const http = require('http')
const fs = require('fs')
const ejs = require('ejs')
const url = require('url')

// contents
const index_page = fs.readFileSync('./index.ejs', 'utf8')
const other_page = fs.readFileSync('./other.ejs', 'utf8')
const style_css = fs.readFileSync('./style.css', 'utf8')

// server setting
let server = http.createServer(getFromClient)

server.listen(3000)
console.log('Server start!')

// CreateServer
function getFromClient(request, response) {
  // 第二引数をtrueにすることでクエリパラメータもパース対象になる
  let url_parts = url.parse(request.url, true)
  switch(url_parts.pathname) {
    case '/':
      var content = "これはindexページ"
      var query = url_parts.query
      if(query.msg != undefined) {
        var query_obj = 
          content += '「' + query.msg + '」と送りました'
      }
      var content = ejs.render(index_page, {
         title: "index",
         content: content,
      })
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
      response.writeHead(200, {'Content-Type': 'text/plain'})
      response.end('no page...')
      break
  }
}
