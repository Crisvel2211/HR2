import Applicant from "../models/applicantModel.js";


// Get all applicants
const getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single applicant
const getApplicantById = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    res.status(200).json(applicant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new applicant
const createApplicant = async (req, res) => {
  const { name, email, phone, position } = req.body;

  try {
    const newApplicant = new Applicant({
      name,
      email,
      phone,
      position,
    });
    await newApplicant.save();
    res.status(201).json(newApplicant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an applicant
const updateApplicant = async (req, res) => {
  try {
    const updatedApplicant = await Applicant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedApplicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    res.status(200).json(updatedApplicant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an applicant
const deleteApplicant = async (req, res) => {
  try {
    const deletedApplicant = await Applicant.findByIdAndDelete(req.params.id);
    if (!deletedApplicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    res.status(200).json({ message: 'Applicant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getApplicants,
  getApplicantById,
  createApplicant,
  updateApplicant,
  deleteApplicant,
};