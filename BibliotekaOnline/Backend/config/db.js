const mongoose = require('mongoose')

mongoose.set('strictQuery', true);

const mongoDBConnString = "mongodb+srv://user:BazaDanych1234@studia.4gjwxyi.mongodb.net/BibliotekaOnline?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(mongoDBConnString)

        console.log(`MongoDb Connected: ${connect.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = {
    connectDB
}