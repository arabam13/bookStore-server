import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "24h",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(403).send({ message: "Invalid Token" });
      } else {
        req.auth = decode;
        next();
      }
    });
  } else {
    res
      .status(401)
      .send({ message: "No Token. You're not allowed to access!" });
  }
};
