const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/', (req, res) => {
    res.send("Hi")
})

app.listen(3000, () => console.log('Server Started on port 3000'));