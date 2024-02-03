var express = require("express")

var http = require("http")
var path = require("path")

var app = express()

app.set("port", 3000)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.all("*", (req, res) => {
  res.render("index")
})

http.createServer(app).listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"))
})
