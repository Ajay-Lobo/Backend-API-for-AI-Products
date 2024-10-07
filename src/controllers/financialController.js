import { FinancialRecord } from "../models/index.js";

const createFinancialRecord = async (req, res) => {
  try {
    const { date } = req.body;

    const existingRecord = await FinancialRecord.findOne({ date });

    if (existingRecord) {
      return res.status(400).json({
        status: "error",
        message: `A financial record already exists for the date ${date}.`,
      });
    }

    const newRecord = new FinancialRecord(req.body);
    await newRecord.save();

    return res.status(201).json({
      status: "success",
      message: "Financial record created successfully",
      data: newRecord,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error creating financial record",
      error: error.message,
    });
  }
};

const getFinancialRecords = async (req, res) => {
  try {
    const records = await FinancialRecord.find();
   
    return res.status(200).json({
      status: "success",
      message: "Financial records fetched successfully",
      data: records,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching financial records",
      error: error.message,
    });
  }
};

const updateFinancialRecord = async (req, res) => {
  try {
    const recordExists = await FinancialRecord.find();

    if (!recordExists || recordExists.length === 0) {
      return res.status(404).json({ message: "No data is present to update." });
    }

    const updatedRecord = await FinancialRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Data not found." });
    }

    return res.status(200).json({
      message: "Financial record updated successfully",
      record: updatedRecord,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating financial record",
      error: error.message,
    });
  }
};

const deleteFinancialRecord = async (req, res) => {
  try {
    const recordExists = await FinancialRecord.find();

    if (!recordExists || recordExists.length === 0) {
      return res.status(404).json({ message: "No data is present to delete." });
    }

    const deletedRecord = await FinancialRecord.findByIdAndDelete(
      req.params.id
    );

    if (!deletedRecord) {
      return res.status(404).json({ message: "Data not found." });
    }

    return res
      .status(200)
      .json({
        message: "Financial record deleted successfully.",
        data: deletedRecord,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting financial record",
      error: error.message,
    });
  }
};

const getFinancialOverview = async (req, res) => {
  try {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

    const records = await FinancialRecord.find({
      date: { $gte: thirtyDaysAgo },
    });

    if (!records || records.length === 0) {
      return res
        .status(404)
        .json({ message: "No financial records found for the last 30 days." });
    }

    const totalRevenue = records.reduce(
      (sum, record) => sum + record.revenue,
      0
    );
    const totalExpenses = records.reduce(
      (sum, record) => sum + record.expenses,
      0
    );

    const totalIncome = totalRevenue - totalExpenses;

    const totalProfitMargin =
      ((totalIncome / totalRevenue) * 100).toFixed(2) || 0;

    return res.status(200).json({
      totalRevenue,
      totalExpenses,
      totalIncome,
      totalProfitMargin,
      data: records,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching financial overview",
      error: error.message,
    });
  }
};

export {
  createFinancialRecord,
  getFinancialRecords,
  updateFinancialRecord,
  deleteFinancialRecord,
  getFinancialOverview,
};