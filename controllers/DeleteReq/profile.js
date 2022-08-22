
const deletingPost = (req, res, db) => {
    const id=req.query.id;
    const imagename=req.query.imagename;
         db.transaction(trx =>{
                trx('posts')
                .where({photo: imagename})
                .delete()
                .then(pic=>{
                    trx('posts')
                    .select('*')
                    .where({userid:id})
                    .then(displayPhoto => {
                     let parentArray =[];
                     let childArray = [];
                     for (i = 0; i< displayPhoto.length; i++){
                        parentArray.push(displayPhoto[i]["photo"]);
                     }
                    childArray.push(parentArray.slice(0));
                    res.json(childArray[0])
                    })
                    .catch(err => console.log(err))
                })

                .then(trx.commit)
                .catch(trx.rollback);      
        })
 }

 module.exports = {
    deletingPost:deletingPost
 };