const numeral = require('numeral')
const https = require('https')

const data = []

const logMemoryUsage = () => {
  const { rss, heapUsed } = process.memoryUsage()
  console.table([[
    'rss',
    'heap used'],[
    numeral(rss).format('0.0 ib'),
    numeral(heapUsed).format('0.0 ib')
  ]]
  )
}

const fetchData = () => {
  https
    .get('https://www.reddit.com/r/javascript.json', (response) => {
      let document = ''

      response.on('data', (chunk) => {
        document += chunk
      })

      response.on('end', () => {
        data.push(JSON.parse(document))
      })
    })
    .on('error', (err) => {
      console.log('Error: ' + err.message)
    })
}

const memoryLeakExample = () => {
  setInterval(() => {
    fetchData()
    logMemoryUsage()
  }, 5000)
}

module.exports = memoryLeakExample
