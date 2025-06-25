const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports = {
  getUser: async (req, res) => {
    const { email } = req.user;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password, ...userResponse } = user.toObject();
      res.json(userResponse);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateUser: async (req, res) => {
    const updates = req.body;
    const userId = req.params.id;

    if (
      updates.email &&
      (!updates.email.includes("@") || !updates.email.includes("."))
    ) {
      res.status(400).json({ message: "Invalid email." });
    }

    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updates.password = hashedPassword;
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password, ...userDetails } = updatedUser.toObject();

      res.json(userDetails);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      res.status(200).json({ message: !!deletedUser });
    } catch (error) {
      res.status(404).json({ message: "User could not be deleted" });
    }
  },
};
