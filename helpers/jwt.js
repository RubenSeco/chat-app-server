const jwt = require("jsonwebtoken");


const createJWT = (uid) => {

  return new Promise((resolve, reject) => {

    const payload = { uid };

    jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: "24hrs"

    }, (err, token) => {

      if (err) {

        reject(err);


      } else {
        resolve(token);
      }
    });

  });
};




module.exports = {
  createJWT,
};