const { connect, set } = require('mongoose');
const MongoDBURL = 'MONGO_URL'

async function connectToDatabase() {
    try {
        await connect(MongoDBURL, {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(async(connection) => {
            await console.log(`🟢 | MongoDB connected as ${connection.connections[0].name}`)
        })
    } catch (error) {
        console.log(`🔴 | Unable to connect to MongoDB!`)
        console.error(error)
    }
}

module.exports = connectToDatabase;