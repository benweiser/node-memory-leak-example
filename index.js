const express = require('express')
const memoryLeak = require('./memoryLeak')

const port = 3000

const app = express()

app.get('/', function (req, res) {
    res.send('Visit chrome://inspect and click on the Memory tab to debug the memory leak')
  })

app.listen(port, () => {
    memoryLeak()
    console.log(`App listening on port http://localhost:${port}`)
})
