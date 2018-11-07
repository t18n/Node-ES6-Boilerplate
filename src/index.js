import dotenv from 'dotenv';

dotenv.config();

const userName = { firstName: 'Turbo', lastName: 'Thinh' };
const userDetails = { nationality: 'Vietnam', email: 'me@turbothinh.com' };

const user = {
  ...userName,
  ...userDetails
};

console.log("User information: \n", user);

console.log('\nAPP_KEY: ' + process.env.APP_KEY);
