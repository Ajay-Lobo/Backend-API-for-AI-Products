import { Enrollment } from "../models/index.js";
import moment from "moment";

const createEnrollment = async (req, res) => {
  const { count, date } = req.body;
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  try {
    if (
      date &&
      new Date(date).getMonth() === currentMonth &&
      new Date(date).getFullYear() === currentYear
    ) {
      return res.status(400).json({
        message:
          "Cannot create a new enrollment record for the current month. Please update the existing record instead.",
      });
    }

    const existingRecord = await Enrollment.findOne({
      date: new Date(date),
    });

    if (existingRecord) {
      existingRecord.count += count;
      await existingRecord.save();
      return res.status(200).json({
        message: "Enrollment record updated successfully",
        record: existingRecord,
      });
    } else {
      const newEnrollment = new Enrollment({
        count,
        date: new Date(date),
      });
      await newEnrollment.save();
      return res.status(201).json({
        message: "New enrollment record created successfully",
        record: newEnrollment,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error creating/updating enrollment record",
      error: error.message,
    });
  }
};

const getMonthlyEnrollments = async (req, res) => {
  try {
    const records = await Enrollment.find();

    if (!records || records.length === 0) {
      return res.status(404).json({ message: "No enrollment records found." });
    }

    const monthlyEnrollments = {};

    records.forEach((record) => {
      const month = moment(record.date).format("MMMM");
      const year = moment(record.date).format("YYYY");
      const monthYearKey = `${month} ${year}`;

      if (!monthlyEnrollments[monthYearKey]) {
        monthlyEnrollments[monthYearKey] = 0;
      }
      monthlyEnrollments[monthYearKey] += record.count;
    });

    const response = Object.entries(monthlyEnrollments).map(
      ([monthYear, count]) => {
        const [month, year] = monthYear.split(" ");
        return {
          month,
          year,
          count,
        };
      }
    );

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching enrollment records",
      error: error.message,
    });
  }
};

export { createEnrollment, getMonthlyEnrollments };
