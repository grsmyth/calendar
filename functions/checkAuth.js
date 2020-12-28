exports.handler = (event, context, callback) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);
  console.log('Function `checkAuth` invoked', data);
  const secret = process.env.AUTH_SECRET;
  const dev = process.env.IS_DEV === 'true';

  if (dev || secret === data.secret) {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(dev ? true : secret === data.secret),
    });
  }

  return callback(null, {
    statusCode: 401,
    body: JSON.stringify(dev ? true : secret === data.secret),
  });
};
