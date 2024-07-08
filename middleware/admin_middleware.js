const adminMiddleWare = async (req, res, next) => {
  try {
    const AdminRole = req.user.isAdmin;
    if (!AdminRole) {
      return res
        .status(403)
        .json({ msg: "Access Denied. user is not an admin" });
    }
    //res.status(200).json({ msg: req.user.isAdmin });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleWare;
