const User = require('./models/userModel');

(async () => {
  try {
    const document = await User.findOne({ email: 'admin@admin.com' });
    if (!document) {
      console.log('Initialising Admin...');
      await User.create({
        username: 'Admin',
        email: 'admin@admin.com',
        userType: 'admin',
        password: process.env.ADMIN_PASSWORD,
        confirmPassword: process.env.ADMIN_PASSWORD,
      });
      console.log('Admin initialised.');
    }
  } catch (err) {
    console.log(err.message);
  }
})();
