import faunadb from 'faunadb';

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

exports.handler = (event, context, callback) => {
  console.log('Function `getAllDays` invoked', process.env.FAUNADB_SECRET);
  return client
    .query(q.Paginate(q.Match(q.Ref('indexes/allDays'))))
    .then((response) => {
      const todoRefs = response.data;
      console.log('Days refs', todoRefs);
      console.log(`${todoRefs.length} Days found`);
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getAllTodoDataQuery = todoRefs.map((ref) => q.Get(ref));
      // then query the refs
      return client.query(getAllTodoDataQuery).then((ret) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(ret),
        })
      );
    })
    .catch((error) => {
      console.log('error', error);
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      });
    });
};
