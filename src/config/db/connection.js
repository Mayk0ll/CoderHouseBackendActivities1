import mongoose from "mongoose"

const connectionDB = async () => {
    try {
        mongoose.connect(`mongodb+srv://${process.env.USERDB}:${process.env.PASSDB}@${process.env.HOSTDB}.pfppp.mongodb.net/${process.env.DBNAME}`)
        console.log('Database connected')
    } catch (error) {
        console.log('Database connection failed')
    }
}

export default connectionDB;