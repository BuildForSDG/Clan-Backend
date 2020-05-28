const Coop = require('../models/cooperative');

exports.createCoop = (req, res) => {
  const url = `${req.protocol}://${req.get('host')}`;
  // console.log(req.body);
  const coop = new Coop({
    coopName: req.body.coopName,
    email: req.body.email,
    agreementPath: `${url}/files/cooperative/documents${req.file.filename}`,
    // packagePath: `${url}/files/cooperative/documents${req.file.filename}`,
    slot: req.body.slot,
    userId: req.body.userId
  });

  coop.save().then(() => {
    res.status(201).json({
      message: 'Cooperative Society Created Successfully'
    });
  }).catch((error) => {
    res.status(400).json({
      errorMsg: 'Cooperative Society creation failed',
      error: error.message
    });
    // console.log(error);
  });
};

// exports.fetchAllCoop = (req, res) => {
//   Coop.find().then((coops) => {
//     res.status(200).json(coops);
//   }).catch((error) => {
//     res.status(400).json(error);
//   });
// };

exports.fetchCoop = (req, res) => {
  Coop.find().then((coops) => {
    const uniqueCoops = coops.map((coop) => {
      if (coop.userId === req.body.userId) return coop;
      return false;
    });
    return res.status(200).json(uniqueCoops);
  }).catch((error) => {
    res.status(400).json({
      error: error.message
    });
  });
};
