

const registering=(req, res, db, bcrypt)=>{
    //distructring and hashing
    const {email, firstname, lastname, pass }= req.body;
    const hash = bcrypt.hashSync(pass);

    if (!email || !lastname || !firstname || !pass){
        return res.status(400).json('Enter valid values!')
    }

    db.transaction(trx =>{
        trx.insert({
            email: email,
            hash: hash
        })
            .into('login')
            .returning('email')
            .then(loginEmail=>{
               return trx('register')
                .returning('*')
                .insert({        
                    firstname: firstname,
                    lastname: lastname,
                    email: loginEmail[0], 
                    joined: new Date()
                })
            .then(user => {
                res.json(user[0])
                })
            })
    .then(trx.commit)
    .catch(trx.rollback);      
        }) 
    .catch(err => { res.status(400).json('user already exits; enable to reg')})
}

 module.exports = {
    registering: registering
 };