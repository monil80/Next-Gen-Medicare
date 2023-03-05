const jwt = require("jsonwebtoken");

const verifyToken1 = (req, res, next) => {
  const authHeader = req.header('token1');
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyToken = (req, res, next) => {
  console.log( localStorage.getItem('auth-token'))
  const authHeader = localStorage.getItem('auth-token');
  //console.log("hi")
  //console.log(authHeader1)
  if (!authHeader) {
    res.status(401).send({ error: "Please authenticate using a valid token null" })
  }
  // try{
  //   const data = jwt.verify(authHeader1, process.env.JWT_SEC);
  //   console.log(data)
  //   req.user = data.user;
  //   next();
  // }
  // catch (error) {
  //   res.status(401).send({ error: "Please authenticate using a valid token" })

  if (authHeader) {
   
    jwt.verify(authHeader, "hi", (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
  
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === localStorage.getItem(auth-token-id) )// req.params.id || req.user.isAdmin)
     {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
