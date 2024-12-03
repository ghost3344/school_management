const schoolService = require('../services/schoolService');

const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const result = await schoolService.addSchool({ name, address, latitude, longitude });
    res.status(201).json({ message: 'School added successfully.', schoolId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add school.', details: error.message });
  }
};

const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    const schools = await schoolService.listSchools(parseFloat(latitude), parseFloat(longitude));
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve schools.', details: error.message });
  }
};

module.exports = { addSchool, listSchools };
