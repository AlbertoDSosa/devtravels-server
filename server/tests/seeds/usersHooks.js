
const data = require('../mocks/users');
const User = require('../../models/User');
 
async function resetUsersData ()  {
    this.timeout(3000);
    // console.log('reiniciando datos')
    await User.deleteMany({});
    for(let user of data.users(3)) {
        await new User(user).save();
    }
}
 
module.exports = { resetUsersData };
