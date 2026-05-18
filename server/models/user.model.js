import { DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../config/db.js";

const User=sequelize.define("User",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false,
        defaultValue:UUIDV4
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },

})

export default User