
const UserProfileInfo = (req, res, db) => {
    const id=req.query.id;
            db.select('*')
            .from('propic')
            .where({userid:id})
                .then(profileData => {
                               res.json(profileData[0]);
                        })
                .catch(err => console.log(err))
 }

 module.exports = {
    UserProfileInfo:UserProfileInfo
 };