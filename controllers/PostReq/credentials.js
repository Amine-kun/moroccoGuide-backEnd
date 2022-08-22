
const UserCreden = (req, res, db) => {
    const {title, bio, id, descri, username} = req.body;
        const image = req.file;
             db.transaction(trx =>{
                    trx.insert({
                        title: title,
                        bio: bio,
                        description: descri,
                        picture: image["filename"],
                        userid:id,
                        username:username,
                    })
                    .into('propic')
                    .then(pic=>{
                        trx('propic')
                        .select('*')
                        .where({userid:id})
                        .then(profileData => {
                               res.json(profileData[0]);
                        })
                        .catch(err => console.log(err))
                    })

                    .then(trx.commit)
                    .catch(trx.rollback);      
            }) 
 }

 module.exports = {
    UserCreden:UserCreden
 };