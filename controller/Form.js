const Form = require("../models/Form");
exports.createFormData = (req, res) => {
  const form = new Form(req.body);

  form.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.status(200).json({ post: result });
  });
};

exports.getAllForm = (req, res) => {
  const forms = Form.find()
    .then((forms) => {
      res.status(200).json({ forms });
    })
    .catch((err) => log.error(err));
};
