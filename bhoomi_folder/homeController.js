
const buildings = require('../model/build');
const floors = require('../model/floor');
const rooms = require('../model/roomname');

exports.getHomePage = async (req, res) => {
  try {
    const allLocations = rooms.map(room => {
      const floor = floors.find(f => f.id === room.floorId);
      const building = buildings.find(b => b.id === floor.buildingId);
      return {
        buildingName: building.name,
        buildingType: building.type,
        floor: floor.floorNumber,
        room: room.roomNumber,
        coordinates: room.coordinates
      };
    });

    res.json({ success: true, data: allLocations });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error loading map data" });
  }
};