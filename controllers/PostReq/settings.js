
const settingsSide = (req, res, db) => {
   const {id,newname, newtitle, newbio, newdesc, currentpic} = req.body;
             const image = req.file;

             if(!image){
                var pic = currentpic;
             }
             else {
                var pic = image["filename"];
             }
             db.transaction(trx =>{
                    trx.update({
                        picture: pic ,
                        username:newname,
                        title:newtitle,
                        bio: newbio, 
                        description: newdesc,
                    })
                    .into('propic')
                    .where({userid:id})
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
    settingsSide:settingsSide
 };