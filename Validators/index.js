exports.createPostValidator = (req, res, next) => {
  req.check("title", "Write a title").notEmpty();
  req.check("title", "Title Must Be Between 4 to 150 characters").isLength({
    min: 4,
    max: 150,
  });

  // body
  req.check("body", "Write a Body").notEmpty();
  req.check("body", "Body Must Be Between 4 to 2000 characters").isLength({
    min: 4,
    max: 2000,
  });

  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  //proceed to next middleware
  next();
};

exports.userSignupValidator = (req, res, next) => {
  // name is not null and Between 4-10 characters
  req.check("name", "Name is required").notEmpty();
  // email is not nu;; . valid and normalized
  req
    .check("email", "Emai must be vbetween ")
    .matches(/.+\@.+..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      maxx: 2000,
    });
  //check fror password
  req
    .check("password", "Password is required")
    .isLength({ min: 6 })
    .withMessage("Password Must contain atleast 6 letters")
    .matches(/\d/)
    .withMessage(" Password Must Conatin a number");

  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  //proceed to next middleware
  next();
};
