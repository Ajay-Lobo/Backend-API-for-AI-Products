import { Children } from "../models/index.js";

const createChild = async (req, res) => {
  try {
    const newChild = new Children(req.body);
    await newChild.save();
    return res.status(201).json({
      success: true,
      message: "Child data created successfully",
      data: newChild,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in creating child",
      error: error.message,
    });
  }
};

const getChildren = async (req, res) => {
  try {
    const children = await Children.find();
    return res.status(200).json(children);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching children",
      error: error.message,
    });
  }
};

const updateChild = async (req, res) => {
  try {
    const existingChild = await Children.findById(req.params.id);

    if (!existingChild) {
      return res.status(404).json({
        success: false,
        message: "No child found with the provided ID.",
      });
    }

    const updatedChild = await Children.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Child updated successfully",
      data: updatedChild,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating child",
      error: error.message,
    });
  }
};

const deleteChild = async (req, res) => {
  try {
    const child = await Children.findById(req.params.id);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "No child found with the provided ID.",
      });
    }

    await Children.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Child deleted successfully",
      data: child,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting child",
      error: error.message,
    });
  }
};

const getChildrenOverview = async (req, res) => {
  try {
    const totalChildren = await Children.countDocuments();

    const activeChildren = await Children.countDocuments({ status: "active" });

    const inactiveChildren = await Children.countDocuments({
      status: "inactive",
    });

    res.status(200).json({
      success: true,
      message: "Children overview data",
      total: totalChildren,
      active: activeChildren,
      inactive: inactiveChildren,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export {
  createChild,
  getChildren,
  updateChild,
  deleteChild,
  getChildrenOverview,
};
