const http = require('http')
const fs = require('fs')
const ejs = require('ejs')
const url = require('url')
const qs = require('querystring')

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
      response_index(request, response)
      break

    case '/other':
      response_other(request, response)
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

var data = {
  'Taro': '09-999-999',
  'Hanako': '080-888-888',
  'Sachiko': '070-777-777',
  'Ichiro': '060-666-666'
}

// response func
function response_index(request, response) {
  var msg = 'これはIndexページ'
  var content = ejs.render(index_page, {
    title: 'Index',
    content: msg,
    data: data,
    filename: 'data_item'
  })
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.write(content)
  response.end()
}

var data2 = {
  'Taro': ['taro@yamada', '09-999-999', 'Tokyo'],
  'Hanako': ['hanako@flower', '080-888-888', 'Yokohama'],
  'Sachiko': ['sachiko@happy', '070-777-777', 'Nagoya'],
  'Ichiro': ['ichi@baseball', '060-666-666', 'USA'],
}

function response_other(request, response) {
  var msg = 'これはotherぺージ'
  var content = ejs.render(other_page, {
    title: 'Other',
    content: msg,
    data: data2,
    filename: 'data_item'
  })
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.write(content)
  response.end()
}
