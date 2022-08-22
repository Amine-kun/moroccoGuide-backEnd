
const liking = (req, res, db) => {
  const {likes,UIS}=req.body;
            db.update({likes: likes ,})
              .into('posts')
              .where({id:UIS})
              .then(()=>{
                      db.select('*')
                      .from('posts')
                      .where({categorie: 'hotel'})
                      .orderBy('id', 'desc')
                      .then(hotels=>{
                         db.select('*')
                         .from('posts')
                          .where({categorie: 'trips'})
                          .orderBy('id', 'desc')
                            .then(trips=>{
                                res.json([hotels,trips])
                            })
                      })
              })
 }

 module.exports = {
    liking:liking
 };