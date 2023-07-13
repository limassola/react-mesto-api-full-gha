const allowedCors = [
  'https://limassola.nomoreparties.sbs',
  'http://limassola.nomoreparties.sbs',
  'localhost:3000',
];

// eslint-disable-next-line consistent-return
const corsMiddleware = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers');
    return res.status(200).end();
  }

  next();
};

module.exports = corsMiddleware;
