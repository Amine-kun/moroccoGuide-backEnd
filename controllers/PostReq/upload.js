
const uploading = (req, res, db) => {
    const {title,userID, desc,id, categorie} = req.body;
    const image = req.file;
         db.transaction(trx =>{
                trx.insert({
                    title: title,
                    desc: desc,
                    photo: image["filename"],
                    userid:userID,
                    likes:0,
                    categorie: categorie,
                })
                .into('posts')
                .then(pic=>{
                    trx('posts')
                    .select('*')
                    .where({userid:userID})
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
    uploading:uploading
 };