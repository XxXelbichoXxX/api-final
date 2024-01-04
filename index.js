const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // Import the cors middleware
require('./utils/mongoConnection');

const ordersRouter = require('./routers/orders.router');
const usersRouter = require('./routers/users.router');
const productsRouter = require('./routers/products.router');

const app = express();
const port = process.env.PORT || 3003;

app.use(morgan('dev'));

// Use the cors middleware
app.use(cors());

app.get('/', (req, res) => {
  res.send('Bienvenido a la API restaurante');
});

app.use(express.json({ limit: '50mb' }));

app.use('/orders', ordersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(port, () => {
  console.log('Servidor iniciado en http://localhost:' + port);
});
