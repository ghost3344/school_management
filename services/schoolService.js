const db = require('../config/db');
const geolib = require('geolib');

// Add a new school
const addSchool = async (schoolData) => {
  const { name, address, latitude, longitude } = schoolData;
  const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  
  const [result] = await db.execute(sql, [name, address, latitude, longitude]);
  return result;
};

// Get schools sorted by proximity
const listSchools = async (userLat, userLng) => {
  const sql = 'SELECT id, name, address, latitude, longitude FROM schools';
  
  const [results] = await db.execute(sql);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const distanceInMeters = geolib.getDistance(
      { latitude: lat1, longitude: lng1 },
      { latitude: lat2, longitude: lng2 }
    );
    return distanceInMeters / 1000;
  };

  return results
    .map((school) => ({
      ...school,
      distance: calculateDistance(userLat, userLng, school.latitude, school.longitude),
    }))
    .sort((a, b) => a.distance - b.distance);
};

module.exports = { addSchool, listSchools };
