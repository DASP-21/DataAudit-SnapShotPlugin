const mongoose = require(`mongoose`)
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.s6a4p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(MONGO_URI)
        console.log(
            `[*]CDC DATABASE Connection Established: @${connect.connection.host}`
        )
    } catch (err) {
        const ERRORLOG = {
            STATUS: `DATABASE CONNECTION ERROR`,
            MSG: `${err.message}`,
        }
        console.table(ERRORLOG)
    }
}

module.exports = connectDB;