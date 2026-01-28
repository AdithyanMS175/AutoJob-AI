const supports = require("../models/supportModel");


// create support / complaint
exports.createSupportController = async (req, res) => {
  try {
    const { userId,subject, message } = req.body;
    

    if (!subject || !message) {
      return res.status(400).json("All fields are required");
    }

    const newSupport = await supports.create({
      userId,
      subject,
      message,
    });

    res.status(201).json(newSupport);
  } catch (err) {
    console.error("createSupportController error:", err);
    res.status(500).json(err.message);
  }
};


// admin - get all complaints
exports.getAllSupportsController = async (req, res) => {
  try {
    const complaints = await supports
      .find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (err) {
    console.error("getAllSupportsController error:", err);
    res.status(500).json(err.message);
  }
};

// admin - reply to complaint
exports.replySupportController = async (req, res) => {
  try {
    const { supportId } = req.params;
    const { reply } = req.body;

    const updated = await supports.findByIdAndUpdate(
      supportId,
      { reply, status: "resolved" },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("replySupportController error:", err);
    res.status(500).json(err.message);
  }
};

// admin - delete complaint
exports.deleteSupportController = async (req, res) => {
  try {
    const { supportId } = req.params;

    await supports.findByIdAndDelete(supportId);

    res.status(200).json("Complaint deleted");
  } catch (err) {
    console.error("deleteSupportController error:", err);
    res.status(500).json(err.message);
  }
};

// user - get my complaints
exports.getMySupportsController = async (req, res) => {
  try {
    const { id } = req.params;

    const complaints = await supports
      .find({ userId: id })
      .sort({ createdAt: -1 });
      

    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err)
  }
};