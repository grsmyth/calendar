exports.handler = (event, context, callback) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);
  const secret = process.env.AUTH_SECRET;
  const dev = process.env.IS_DEV === 'true';
  console.log('Function `checkAuth` invoked ', dev);

  if (dev || secret === data.secret) {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(true),
    });
  }

  return callback(null, {
    statusCode: 401,
    body: JSON.stringify(false),
  });
};
