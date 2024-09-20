const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();
const staticFileMiddleware = express.static(path.join(__dirname, '/build'));
app.use(staticFileMiddleware);
app.use(history());
app.use(staticFileMiddleware);

app.get('/', (req, res) => {
  res.render(path.join(`${__dirname}/index.html`));
  console.log(res);
});

// Sử dụng biến môi trường để xác định port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express serving on ${port}!`);
});