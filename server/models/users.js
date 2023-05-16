const mongoose = require('mongoose');

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + (d.getDate()+1),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    image:{
      type: String,
      trim:true
    },
    
    date_of_birth: {
      type: String,
      required: true,
      set: date => formatDate(date),
      trim: true,
    },
  }
);

const Users = mongoose.model('Users', userSchema);

module.exports = Users;