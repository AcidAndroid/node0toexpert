const express = require('../node_modules/express');
const app = express();


app.use(require('./usuario'))
app.use(require('./login'))
app.use(require('./categoria'))
app.use(require('./producto'))
app.use(require('./uploads'))
app.use(require('./imagen'))


module.exports = app