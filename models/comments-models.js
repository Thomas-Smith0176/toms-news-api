const db = require('../db/connection');
const format = require('pg-format')

exports.selectCommentsByArticleId = (articleId) => {
    return db.query(`
    SELECT comment_id, votes, created_at, author, body, article_id 
    FROM comments
    WHERE comments.article_id = $1
    ORDER BY created_at DESC;`, [articleId])
    .then((response) => {
        return response.rows
    });
};

exports.deleteComment = (comment_id) => {
    return db.query(`
    DELETE FROM comments
    WHERE comment_id = $1;`, [comment_id])
};

exports.insertComment = (body, username, article_id,) => {
    const query = format(`
    INSERT INTO comments
    (body, author, article_id)
    VALUES
    ( %L, %L, %s)
    RETURNING *;`, body, username, article_id)
    return db.query(query)
    .then((response) => {
        return response.rows[0]
    })
}
