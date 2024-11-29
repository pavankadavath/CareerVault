const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    skills: {
        type: String
    },
    educationDetails: {
        type: String
    },
    resumeUrl:{
        type:String,
    },
});
const User = mongoose.model('Users', UserSchema);
module.exports = User;

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const UserSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   userType: {
//     type: String,
//     enum: ['JobSeeker', 'Recruiter'],
//     required: true,
//   },
//   phoneNumber: {
//     type: String,
//     default: ''
//   },
//   address: {
//     type: String,
//     default: ''
//   },
//   skills: {
//     type: String,
//     default: ''
//   },
//   educationDetails: {
//     type: String,
//     default: ''
//   },
//   resumeUrl: {
//     type: String,
//     default: '',
//     required: function() {
//       return this.userType === 'JobSeeker';
//     }
//   },
//   companyName: {
//     type: String,
//     default: '',
//     required: function() {
//       return this.userType === 'Recruiter';
//     }
//   },
//   companyImageUrl: {
//     type: String,
//     default: ''
//   }
// });

// const User = mongoose.model('Users', UserSchema);
// module.exports = User;