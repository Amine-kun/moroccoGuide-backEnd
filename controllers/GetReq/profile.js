
const profiling = (req, res, db)=>{
        const id=req.query.id;
            db.select('*')
            .from('posts')
            .where({userid:id})
                .then(displayPhoto => {
                 let parentArray =[];
                     let childArray = [];
                     let pictureidor=[];
                     for (i = 0; i< displayPhoto.length; i++){
                        parentArray.push(displayPhoto[i]["photo"]);
                        pictureidor.push(displayPhoto[i]["id"]);
                     }
                childArray.push(parentArray.slice(0));
                childArray.push(pictureidor.slice(0));
                res.json(childArray)
                    })
                .catch(err => console.log(err))


    } 

    module.exports = {
    	profiling:profiling
    };