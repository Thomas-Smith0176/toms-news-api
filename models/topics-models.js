const { response } = require('../app');
const db = require('../db/connection')

exports.selectTopics = () => {
    return db.query(`
    SELECT * FROM topics;`)
    .then(({rows}) => {
        return rows
    });
};

exports.insertTopic = (slug, description) => {
    if (!slug || !description || typeof slug !== 'string' || typeof description !== 'string') {
        return Promise.reject({status: 400, msg: 'Bad request'})
    };

    return db.query(`
    INSERT INTO topics
    (slug, description)
    VALUES
    ($1, $2)
    RETURNING *;`, [slug, description])
    .then((response) => {
        return response.rows[0]
    });
}; 