const mongoose = require(`mongoose`)
const MONGO_URI =   process.env.MONGO_URI || `mongodb://localhost:27017/test-cdc`

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