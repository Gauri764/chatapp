import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, //7 days in millseconds
        httpOnly: true, //prevents xss cross-site scripting attacks, since now the token cannot be accessed through javascript on browser
        sameSite: "strict", //csrf attacks cross-site request forgery attack
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
};