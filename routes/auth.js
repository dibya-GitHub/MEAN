const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const config = require("../config");
const secret = config.DIBYA_SECRET;
let ObjectID = require("mongodb").ObjectID;
const validate = require("../controllers/validate");
let userModel = require("../models/user_collection.model");
let autherization = require("./autherization");
const express = require("express");
const router = express.Router();

router.route("/signup").post((req, res) => {
  const NAME = req.body.name;
  const EMAIL = req.body.email;
  const PASSWORD = req.body.password;
  if (!EMAIL || !PASSWORD) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }
  if (!validate.checkString(EMAIL) || !validate.checkEmail(EMAIL)) {
    return res.status(422).send({ error: "Email is not valid" });
  }
  if (!validate.checkString(PASSWORD)) {
    return res.status(422).send({ error: "Password is not valid" });
  }
  if (!validate.checkPasswordLength(PASSWORD)) {
    return res.status(422).send({ error: "Password is too short" });
  }
  if (EMAIL === PASSWORD) {
    return res
      .status(422)
      .send({ error: "Password must not match email address" });
  }

  userModel.findOne({ email: EMAIL }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: "Email is already exist" });
    } else {
      hashPassword(PASSWORD, function (err, hash) {
        if (err) {
          return next(err);
        }
        const emailConfirmCode = createLinkCode("ecc");
        const USER = {
          name: NAME,
          email: EMAIL,
          password: hash,
          emailConfirmed: false,
          emailConfirmCode: emailConfirmCode,
        };
        userModel.insertMany(USER, function (err, result) {
          if (err) {
            return next(err);
          }
          console.log(result);
          res.json({
            status: "Success",
            statusCode: 200,
            token: tokenForUser({ id: result[0]._id }),
            statusText: "User Created Successfully",
          });
        });
      });
    }
  });
});
router.route("/signin").post((req, res) => {
  const EMAIL = req.body.email;
  const PASSWORD = req.body.password;
  if (!EMAIL || !PASSWORD) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }
  if (!validate.checkString(EMAIL) || !validate.checkEmail(EMAIL)) {
    return res.status(422).send({ error: "Email is not valid" });
  }
  if (!validate.checkString(PASSWORD)) {
    return res.status(422).send({ error: "Password is not valid" });
  }

  // userModel.findOne({ email: EMAIL }, (err, result) => {
  //   if (result) {
  //     const isMatch = bcrypt.compare("sdfdf", "Sdfsdf");
  //     res.send({ token: tokenForUser({ id: req.user }) });
  //   } else {
  //     res.status(400).json({
  //       error: "User Not Exist",
  //     });
  //   }
  // });

  userModel.findOne({ email: EMAIL }, (err, user) => {
    if (user) {
      let isMatch = comparePassword(PASSWORD, user.password);
      if (isMatch) {
        console.log(user);
        res.send({ token: tokenForUser({ id: user._id }) });
      } else {
        res.status(400).json({
          error: "Email / Password is wrong",
        });
      }
    } else {
      res.status(400).json({
        error: "Something went wrong",
      });
    }
  });
});

router.route("/forgotpw").post((req, res) => {
  if (
    !req.body.email ||
    !validate.checkString(req.body.email) ||
    !validate.checkEmail(req.body.email)
  ) {
    return res
      .status(422)
      .send({ error: "You must provide a valid email address" });
  }
  const EMAIL = req.body.email.toLowerCase();
  userModel.findOne({ email: EMAIL }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      const resetToken = createLinkCode("pwr");
      res.send(resetToken);
      // userModel.updateOne({ email: EMAIL }, { $set: { "resetPassword": resetToken, "sentMail": sentMail } }, function (err, updated) {
      //   if (err) {
      //     return next(err);
      //   }
      //   email.forgotPasswordEmail(EMAIL, resetToken, function (err, success) {
      //     if (err) {
      //       return next(err);
      //     }
      //     return res.send({ error: 'Thank you. Please check your email.', code: 'ef' });
      //   });
      // });
    }
  });
});

router.get("/me", autherization, (req, res) => {
  try {
    var myobj = {
      id: req.user,
    };
    console.log(req.user);
    var query = {
      _id: ObjectID.createFromHexString(myobj.id),
    };
    userModel.findById(
      query._id,
      { password: 0, emailConfirmCode: 0 },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
  } catch (e) {
    res.send({ error: "Error in Fetching user" });
  }
});

router.route("/resetpw").get((req, res) => {
  const EMAIL = req.body.email;
  const PASSWORD = req.body.password;
  const RESET_CODE = req.body.reset;
  if (!EMAIL || !PASSWORD) {
    return res
      .status(422)
      .send({ error: "You must provide email and new password" });
  }
  if (!RESET_CODE || !checkCodeTime(RESET_CODE)) {
    return res.status(422).send({
      error:
        "Your forgotten password link has expired, you must use the link within 1 hour",
    });
  }
  if (!validate.checkString(EMAIL) || !validate.checkEmail(EMAIL)) {
    return res.status(422).send({ error: "Email is not valid" });
  }
  if (!validate.checkString(PASSWORD)) {
    return res.status(422).send({ error: "Password is not valid" });
  }
  if (!validate.checkPasswordLength(PASSWORD)) {
    return res.status(422).send({ error: "Password is too short" });
  }
  if (EMAIL === PASSWORD) {
    return res
      .status(422)
      .send({ error: "Password must not match email address" });
  }
  userModel.findOne({ email: EMAIL }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    if (!existingUser) {
      return res.status(422).send({ error: "Email not found" });
    }
    if (existingUser.resetPassword !== RESET_CODE) {
      return res.status(422).send({ error: "Reset link not valid" });
    }
    hashPassword(PASSWORD, function (err, hash) {
      if (err) {
        return next(err);
      }
      const passwordHash = hash;
      return res.json({ token: tokenForUser({ id: existingUser._id }) });
      // userModel.updateOne({ email: EMAIL }, { $set: { "password" : passwordHash }, $unset: { "resetPassword": "" } }, function(err, updated) {
      //     if (err) {
      //         return next(err);
      //     }
      //     // Respond to request with a token now password is updated user is logged in
      // });
    });
  });
});
router.route("/reset").get((req, res) => {
  const RESET_CODE = req.body.resetCode;
  const timeLeft = checkCodeTime(RESET_CODE);
  if (!timeLeft) {
    // TOKEN NOT VALID
    return res.status(422).send({ error: "Reset link has expired" });
  } else {
    return res.send({ error: "Reset link valid", timeleft: timeLeft });
  }
});
router.route("/me").get((req, res) => {});
router.route("/").get((req, res) => {
  res.send("welcome to auth");
});
module.exports = router;

// function comparePassword(pass, hashPass) {
//   return bcrypt.compareSync(pass, hashPass);
// }
function checkCodeTime(linkCode) {
  if (!linkCode) {
    return false;
  }
  const tokenArr = linkCode.split("-");
  const timestamp = tokenArr[0];
  const now = new Date().getTime();
  const difference = timestamp - now;
  // default to 1 hour
  let timeLeft = Math.floor(difference / 1000 / 60) + 60;
  // if email confirmation expire in 24 hours
  if (tokenArr[2] === "ecc") {
    timeLeft = Math.floor(difference / 1000 / 60) + 60 * 24;
  }
  if (timeLeft < 1) {
    // expired
    return false;
  } else {
    // valid
    return timeLeft;
  }
}

function hashPassword(password, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return callback(err);
    }
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        return callback(err);
      }
      callback(null, hash);
    });
  });
}
function createLinkCode(type) {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 10000);
  const linkCode = timestamp + "-" + randomNum + "-" + type;
  return linkCode;
}
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  const expireTime = timestamp + 1000 * 60 * 60 * 24 * 7;
  return jwt.encode({ sub: user.id, iat: timestamp, exp: expireTime }, secret);
}
function comparePassword(suppliedPassword, userPassword) {
  return bcrypt.compare(suppliedPassword, userPassword);
}
