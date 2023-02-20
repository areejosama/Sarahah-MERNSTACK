const mongoose= require('mongoose');
mongoose.set('strictQuery', true)
const dbconnection=  async()=>{
    return await mongoose.connect(process.env.dburl)
    .then ((result)=>{
        console.log('connected')
    }).catch((error)=>{
        console.log(`catch error ${error}`)
    })
}

module.exports={dbconnection};