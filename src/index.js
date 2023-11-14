const express = require('express')
const app = express()
const port = 3000


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/index2.html", (req, res) => {
    res.sendFile(__dirname + "/index2.html");
});