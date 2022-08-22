

const logining = (req, res, db, bcrypt)=>{
    db.select('email', 'hash').from('login')
      .where('email','=', req.body.email)
      .then (data =>{
      const isValid = bcrypt.compareSync(req.body.pass, data[0].hash);
        if (isValid) { 
           return db.select('*')
              .from('register')
              .where('email','=', req.body.email)
              .then(user=>{
                res.json(user[0])
              })
              .catch (err=>{res.status(400).json('Cant get user')})
        }
        else {
            res.status(400).json('There no such user!!')
        }
      })
      .catch(err=>res.status(400).json('Enter Valid informations'))

}

module.exports = {
	logining: logining
};