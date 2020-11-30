const express = require('express')
const app = express()
const port = 3000
const compression = require('compression')

app.use(express.static('public'))
app.use(compression())

app.get('/', (req,res) => {
 res.send("index")
})

app.listen(port, () => {
 console.log(`Servidor rodando na porta ${port}`)
})