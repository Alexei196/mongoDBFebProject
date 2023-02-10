import app from "./server.js"
import mongodb from "mongodb"
import donenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
donenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 500,
        wtimeoutMS: 25,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await RestaurantsDAO.injectDB(client)
    app.listen(port, ()=> {
        console.log('listening on port ${port}')
    })
}) 