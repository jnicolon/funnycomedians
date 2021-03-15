const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
  res.render('./pages/index')
})

app.use((req, res)=>{
  res.status(404).render('./pages/404')
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
