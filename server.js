const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
  res.render('./pages/index')
})

app.get('/:comedianId', (req, res)=>{
  res.render('./pages/comedian', {data: req.params})
})

app.use((req, res)=>{
  res.status(404).render('./pages/404')
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
