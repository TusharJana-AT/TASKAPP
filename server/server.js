import app from './app.js'
import { sequelize } from './config/db.js'
import './models/index.js'

const PORT=5000

sequelize.sync({alter:true}).then(()=>{
    console.log('DB Connected');
    app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})
})