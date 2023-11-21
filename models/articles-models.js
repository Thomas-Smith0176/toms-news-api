
const db = require('../db/connection')

exports.selectArticles = (topic) => {
    let queryString = ` 
    SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, CAST(COUNT(comment_id) AS INTEGER) AS comment_count 
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id`
    const queries = []
    
    if(topic) {
        queries.push(topic)
        queryString += `
        WHERE topic = $1`
    }

    queryString += `
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC ;`

    return db.query(queryString, queries)
    .then((response) => {
        if (!response.rows[0]) {
            return Promise.reject({ status: 404, msg: 'Not found'})
        }
        return response.rows
    })
};

exports.selectArticleById = (article_id) => {
    return db.query(`
    SELECT * FROM articles 
    WHERE article_id = $1;`, [article_id])
    .then((response) => {
        if (!response.rows[0]) {
            return Promise.reject({status: 404, msg: 'Not found'})
        }
        return response.rows[0]
    })
}

