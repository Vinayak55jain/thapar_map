const pool = require("../service/db");

exports.getAllBuildingLocations = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, latitude, longitude, address FROM buildings");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch building locations", details: err });
  }
};