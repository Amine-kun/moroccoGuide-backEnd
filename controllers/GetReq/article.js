
const articleDisplayer = (req, res, db) => {
       const articleid=req.query.articleid;
            db.select('*')
            .from('posts')
            .where({id: articleid})
                .then(articledata => {
                    res.json(articledata[0])   })
                .catch(err => console.log(err))
 }

 module.exports = {
    articleDisplayer:articleDisplayer
 };