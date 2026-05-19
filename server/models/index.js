import Task from './task.model.js'
import User from './user.model.js'

User.hasMany(Task,{foreignKey:"userId"})
Task.belongsTo(User,{foreignKey:"userId"})

export {
    Task,
    User,
}
