
const tripsDisplayer = (req, res, db) => {
 db.select('*')
            .from('posts')
            .where({categorie: 'hotel'})
            .orderBy('id', 'desc')
                .then(data => {
                    db.select('*')
                            .from('posts')
                            .where({categorie: 'trips'})
                            .orderBy('id', 'desc')
                            .then(data2=>{
                                res.json([data,data2])
                            })
                    })
                .catch(err => console.log(err))

 }

 module.exports = {
    tripsDisplayer:tripsDisplayer
 };