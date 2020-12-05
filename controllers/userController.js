const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../token/auth");

const User = require("../models/user.model");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/signup",
  [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      firstName,
      lastName,
      username,
      email,
      password,
      country,
      state,
      city,
      mobileNo,
      pinCode,
      address1,
      address2,
      addType } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists",
        });
      }

      user = new User({
        firstName,
        lastName,
        email,
        username,
        country,
        state,
        city,
        pinCode,
        address1,
        address2,
        mobileNo,
        addType,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            userData: { "username": user.username, "email": user.email, "firstName": user.firstName, "lastName": user.lastName },
            "token": token,
            statusCode: 200,
            statusMessage: "User Created Successfully",
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !",
        });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token: token,
            statusCode: 200,
            statusMessage: "Success",
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /user/me
 */

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    user.password = null
    res.json({
      "userData": {
        "id": user._id,
        "email": user.email,
        "username": user.username,
        "createdAt": user.createdAt
      }
    });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

router.get("/profile/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json({
      "userData": {
        "id": user._id,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "country": user.country,
        "state": user.state,
        "city": user.city,
        "mobileNo": user.mobileNo,
        "pinCode": user.pinCode,
        "address1": user.address1,
        "address2": user.address2,
        "addType": user.addType,
        "email": user.email,
        "username": user.username,
        "createdAt": user.createdAt,
      }
    });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

router.put("/profile/me", (req, res) => {
  updateProfileRecord(req, res);
});
function updateProfileRecord(req, res) {
  User.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        doc.updatedAt = new Date();
        res.status(200).json({
          status: "Success",
          statusCode: 200,
          userData: doc,
        });
      } else {
        res.status(400).json({
          errorMessage: "Missing required parameter",
          status: "BAD_REQUEST",
          statusCode: 400,
        });
      }
    }
  );
}
module.exports = router;
