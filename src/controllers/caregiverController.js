import { Caregiver } from "../models/index.js";

const createCaregiver = async (req, res) => {
  try {
    const newCaregiver = new Caregiver(req.body);
    await newCaregiver.save();
    return res.status(201).json({
      success: true,
      message: "Caregiver created successfully",
      data: newCaregiver,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating caregiver",
      error: error.message,
    });
  }
};

const getCaregivers = async (req, res) => {
  try {
    const caregivers = await Caregiver.find();
    return res.status(200).json({
      success: true,
      message: "Caregiver fetched successfully",
      data: caregivers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching caregivers",
      error: error.message,
    });
  }
};

const updateCaregiver = async (req, res) => {
  try {
    const caregiver = await Caregiver.findById(req.params.id);

    if (!caregiver) {
      return res.status(404).json({
        success: false,
        message: "No caregiver found with the provided ID.",
      });
    }

    const updatedCaregiver = await Caregiver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Caregiver updated successfully",
      data: updatedCaregiver,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating caregiver",
      error: error.message,
    });
  }
};

const deleteCaregiver = async (req, res) => {
  try {
    const caregiver = await Caregiver.findById(req.params.id);

    if (!caregiver) {
      return res.status(404).json({
        success: false,
        message: "No caregiver found with the provided ID.",
      });
    }

    await Caregiver.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Caregiver deleted successfully",
      data: caregiver,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting caregiver",
      error: error.message,
    });
  }
};

const getCaregiverOverview = async (req, res) => {
  try {
    const totalCaregivers = await Caregiver.countDocuments();

    const activeCaregivers = await Caregiver.countDocuments({
      status: "Active",
    });

    const inactiveCaregivers = await Caregiver.countDocuments({
      status: "Inactive",
    });

    res.status(200).json({
      success: true,
      message: "Caregivers overview",
      total: totalCaregivers,
      active: activeCaregivers,
      inactive: inactiveCaregivers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export {
  createCaregiver,
  getCaregivers,
  updateCaregiver,
  deleteCaregiver,
  getCaregiverOverview,
};
