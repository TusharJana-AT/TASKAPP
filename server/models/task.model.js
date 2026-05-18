import { DataTypes, UUID, UUIDV4 } from "sequelize";
import { sequelize } from "../config/db.js";


const Task=sequelize.define('Task',{
    id:{
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    status:{
        type:DataTypes.ENUM('Pending','In Progress','Completed')
    },
    dueDate:{
        type:DataTypes.DATE
    }
})

export default Task