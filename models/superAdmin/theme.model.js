const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const themeSchema = mongoose.Schema(
  {
    themeName: {
      type: String,
      require: true
    },
    primaryColor: {
      type: String,
      required: true,
    },
    secondaryColor: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
themeSchema.plugin(toJSON);
themeSchema.plugin(paginate);

const Theme = mongoose.model('Theme', themeSchema);

module.exports = Theme;
