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
        const payload = { sub: req.user.id, role: req.user.admin };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        delete req.user.password;
        res
          .status(200)
          .cookie("makesense_access_token", `Bearer ${token}`, {
            expires: new Date(Date.now() + 2 * 3600000), // cookie will be removed after 2 hours
          })
          .json({
            admin: req.user.admin,
            id: req.user.id,
            avatar_url: req.user.avatar_url,
          });
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
    console.error("Erreur de verification Token:", err);
    res
      .location(`/login?datareset=1`)
      .clearCookie("makesense_access_token")
      .sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
