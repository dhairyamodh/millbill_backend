const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const subscriptionSchema = mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'restaurants',
      required: true,
    },
    subscriptionId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'subscription',
      required: true,
    },
    subStartDate: {
      type: String,
      required: true,
    },
    allowedUsers: {
      type: String,
      require: true,
    },
    allowedBranches: {
      type: String,
      require: true,
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
subscriptionSchema.plugin(toJSON);
subscriptionSchema.plugin(paginate);

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
