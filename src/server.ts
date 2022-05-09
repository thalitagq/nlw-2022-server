import express from 'express'
// import cors from 'cors'
import { routes } from './routes'

const app = express()
const cors = require("cors");

app.use(cors());
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


app.use(express.json())
app.use(routes);

app.listen(process.env.PORT, ()=> {
  console.log("HTTP server running")
})