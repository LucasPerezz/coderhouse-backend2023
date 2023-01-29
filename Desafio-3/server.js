const express = require('express');
const ProductManager = require('./ProductManager');
const app = express();
app.use(express.urlencoded({extended: true}))

app.get('/products', async (req, res) => {
    let {limit} = req.query;
    const products = await ProductManager.getProducts();
    (limit && !isNaN(limit)) ? res.json(products.slice(0, limit)) : res.json(products);
})

app.get('/products/:id', async (req, res) => {
    const params = Number(req.params.id);
    res.json(await ProductManager.getProductById(params));
})

const port = 3080;
app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
  })
