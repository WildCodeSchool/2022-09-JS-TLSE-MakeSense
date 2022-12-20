const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashPassword = async (req, res, next) => {
  // hash the password using argon2 then call next()
  try {
    const hashedPassword = await argon2.hash(req.body.password, {
      y: 2,
      m: 15360,
      t: 2,
      p: 1,
    });
    // console.log(hashedPassword);
    req.body.hashedPassword = hashedPassword;
    delete req.body.password;
    next();
  } catch (err) {
    console.warn(err);
  }
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        delete req.user.password;
        res
          .clearCookie("userToken")
          .cookie("userToken", token, { maxAge: 2 * 60 * 60 * 1000 }) // maxAge : 1 hour
          .send(
            `Credentials are valid with Token=${token} and user=${req.user.email}`
          );
      } else {
        res.status(401).send("Réfléchis encore !");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }
    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }
    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
