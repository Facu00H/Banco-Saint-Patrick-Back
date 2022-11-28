const mongoose = require('mongoose');
// eslint-disable-next-line no-undef
const { MONGO_URI } = process.env;

mongoose.connect(
  MONGO_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
)
  .then(() => console.log('DB connected.'))
  .catch((err) => console.log(err));
