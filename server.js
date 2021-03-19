const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

const pool = require('./postgres/pool');


app.use(cors());
app.use(express.json());
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.get('/', async (req, res)=>{

  res.render('./pages/index')
})

app.get('/api/:comedians', async(req, res)=>{
  
  const query = `SELECT 
                        comedian_name, 
                        id 
                 FROM 
                        comedians 
                 WHERE 
                        comedian_name ILIKE $1
                 LIMIT 10`

pool.query(query, [`${req.params.comedians}%`], (err, psRes)=>{
    err ? console.log(err) : res.json(psRes.rows)  })
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
