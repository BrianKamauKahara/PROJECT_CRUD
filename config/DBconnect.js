// Load environment variables
if (process.env.NODE_ENV != "production"){
    require('dotenv').config()
}


const mongoose = require("mongoose")

const connectToDB = async () => {
    console.log('CONNECTING TO DB')
    try{
        await mongoose.connect(process.env.MONGOLINK)
        console.log("CONNECTED!")
    } catch(e){
        console.log(e)
    }
    
}

module.exports = connectToDB