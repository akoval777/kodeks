import express from 'express'
import bodyParser from 'body-parser'
import React from 'react'

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('auto.db')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/auto', (req, res) => {
  db.all('SELECT * FROM auto', function (err, rows) {
    res.setHeader('Content-Type', 'application/json')
    res.send(rows)
  })
})

app.post('/auto', (req, res) => {
  db.run(
    `INSERT INTO auto (id,marque,model,year,haul,price) VALUES (NULL, '${req.body.marque}','${req.body.model}','${req.body.year}','${req.body.haul}','${req.body.price}')`)
  res.end()
})

app.put('/auto', (req, res) => {
  db.run(
    `UPDATE auto SET marque = '${req.body.marque}', model = '${req.body.model}', year = '${req.body.year}', haul = '${req.body.haul}', price = '${req.body.price}' WHERE id = ${req.body.id}`)
  res.end()
})

app.get('/auto/:id', (req, res) => {
  db.run(`DELETE FROM auto WHERE id = ${req.params.id}`)
  res.end()
})

app.use((req, res) => {
  res.end(renderHTML())
})

function renderHTML () {
  return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello React</title>
          <link rel="stylesheet" href="assets/styles.css">
      </head>
      <body>
        <div id="react-view"></div>
        <script src="assets/bundle.js"></script>
      </body>
    </html>
  `
}

const PORT = 8080

const server = app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`)
})

process.on('SIGINT', () => {
  db.close()
  server.close()
})