const express = require('express')
const app = express()
const APP_PORT = process.env.APP_PORT || 3000;
app.get('/', (req, res) => {
  res.send('Manhar')
}) 
app.listen(APP_PORT, () => { 
  console.log(`Running app at porfdfdft:${APP_PORT}`)
})    

