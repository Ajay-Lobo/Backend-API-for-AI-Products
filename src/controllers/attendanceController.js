import { Children, Attendance } from "../models/index.js";

const recordAttendance = async (req, res) => {
  const { childId, status } = req.body;
  const date = req.body.date || new Date();

  try {
    const child = await Children.findById(childId);
    if (!child) {
      return res.status(404).json({
        message: "Child not found. Please check the child ID.",
      });
    }

    if (child.status === "inactive") {
      return res.status(400).json({
        message: "Cannot record attendance for inactive child.",
      });
    }

    const existingRecord = await Attendance.findOne({
      childId,
      date: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    });

    if (existingRecord) {
      return res.status(400).json({
        message:
          "Attendance for this child has already been recorded for today.",
        record: existingRecord,
      });
    }

    const newAttendance = new Attendance({
      childId,
      date,
      status,
    });
    await newAttendance.save();

    return res.status(201).json({
      message: "Attendance recorded successfully",
      record: newAttendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error recording attendance",
      error: error.message,
    });
  }
};

const updateAttendance = async (req, res) => {
  const { childId, status, date } = req.body;

  try {
    const existingRecord = await Attendance.findOne({
      childId,
      date: {
        $gte: new Date(date).setHours(0, 0, 0, 0),
        $lt: new Date(date).setHours(23, 59, 59, 999),
      },
    });

    if (!existingRecord) {
      return res.status(404).json({
        message: "No attendance record found for the given date and child.",
      });
    }

    const child = await Children.findById(childId);
    if (!child || child.status === "inactive") {
      return res.status(400).json({
        message: "Cannot update attendance for an inactive child.",
      });
    }

    existingRecord.status = status;
    await existingRecord.save();

    return res.status(200).json({
      message: "Attendance record updated successfully",
      record: existingRecord,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating attendance record",
      error: error.message,
    });
  }
};

const getAllAttendanceMetrics = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();

    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({
        message: "No attendance records found in the database.",
      });
    }

    const attendanceMetrics = [];

    const dateWiseMetrics = {};

    attendanceRecords.forEach((record) => {
      const date = record.date.toISOString().split("T")[0];
      if (!dateWiseMetrics[date]) {
        dateWiseMetrics[date] = {
          onTime: 0,
          late: 0,
          absent: 0,
          dayOff: 0,
        };
      }

      switch (record.status) {
        case "on-time":
          dateWiseMetrics[date].onTime += 1;
          break;
        case "late":
          dateWiseMetrics[date].late += 1;
          break;
        case "absent":
          dateWiseMetrics[date].absent += 1;
          break;
        case "day-off":
          dateWiseMetrics[date].dayOff += 1;
          break;
        default:
          break;
      }
    });

    for (const [date, metrics] of Object.entries(dateWiseMetrics)) {
      attendanceMetrics.push({
        date,
        data: metrics,
      });
    }

    return res.status(200).json({
      message: "All attendance metrics fetched successfully",
      attendanceMetrics,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching attendance metrics",
      error: error.message,
    });
  }
};

export { recordAttendance, updateAttendance, getAllAttendanceMetrics };
