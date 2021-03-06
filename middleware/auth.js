const jwt = require("jsonwebtoken");
const key = {
  tokenKey: "djghhhhuuwiwuewieuwieuriwu"
}

module.exports = function(req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
    return res.json({
      code: 401,
      message: "k co quyen dang nhap",
      data: null
    })
  } else {
    try {
      const verified = jwt.verify(token, key.tokenKey);
      user = verified;
      next();
    } catch (err) {
      return res.json({
        code: 400,
        message: " token khong hop le",
        data: null
      })
    }
  }
}