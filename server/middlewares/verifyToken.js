const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const bearerToken = req.headers["authorization"];

    if(!bearerToken){
        res.status(401).send("unauthorized");
        return
    }

    const splitBearerToken = bearerToken.split(" ");
    const token = splitBearerToken[1];

    jwt.verify(token, "rahasia", (err, data) => {
        if(err) {
            res.status(401).send("unauthorized");
        } else {
            req.user = data;
            next()
        }
    });
}

module.exports = verifyToken;