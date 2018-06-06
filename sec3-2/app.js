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

// response func
function response_index(request, response) {
  var msg = 'これはIndexページ'
  var content = ejs.render(index_page, {
    title: 'Index',
    content: msg,
  })
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.write(content)
  response.end()
}

function response_other(request, response) {
  var msg = 'これはotherぺージ'
  // POSTアクセス時の処理
  if (request.method == 'POST') {
    var body = ''

    // データ受信のイベント処理
    request.on('data', (data) => {
      body += data
    })
  // データ受信終了後のイベント処理
    request.on('end', () => {
      var post_data = qs.parse(body)
      msg += 'あなたは「' + post_data.msg + '」と書きました'
      var content = ejs.render(other_page, {
        title: 'Ohter',
        content: msg,
      })
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.write(content)
      response.end()
    })
  // GETアクセス時の処理
  } else {
    var msg = 'ページがありません'
    var content = ejs.render(other_page, {
      title: 'Other',
      content: msg,
    })
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.write(content)
    response.end()
  }
}
