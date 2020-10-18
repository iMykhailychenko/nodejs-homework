// const { verifyToken } = require("../../services/token.service");
// const User = require("../users/users.model");

// export const checkAuthTokenMiddleware = async (req, res, next) => {
//   try {
//     const token = req.get("Authorization");
//     if (!token) {
//       return res.status(401).send("No token provided");
//     }
//     const data = await verifyToken(token);
//     req.userId = data.id;
//     const user = await User.findUserById(data.id);
//     if (!user) {
//       return res.status(401).send("Not authorized");
//     }

//     req.user = {
//       email: user.email,
//       id: user._id,
//       subscription: user.subscription,
//     };
//     next();
//   } catch (e) {
//     console.log("CheckAuthTokenMiddleware error message:", e.message);
//   }
// };
