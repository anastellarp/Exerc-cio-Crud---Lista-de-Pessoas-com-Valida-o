const express = require('express');
const app = express();

app.use(express.json());

const criaturasRouter = require('./routes/criaturas');
app.use(criaturasRouter);

app.listen(3000, () => {
    console.log("Api rodando em http://localhost:3000")
})
