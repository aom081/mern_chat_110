export const protectrdRoutes = async (req, res, next) => {
  try {
        
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
