const connectToMongo =  require('./db');

const express = require('express');
const { default: mongoose } = require('mongoose');
var cors = require('cors');

mongoose.set('strictQuery', true); // strictQurey code

connectToMongo();
const app = express()
const port = 5000



app.use(cors())


//middle ware
app.use(express.json())

mongoose.set('strictQuery', true);
// avaiable rotues.....

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`NoteBook backend listening on port http://localhost:${port}`)
})
