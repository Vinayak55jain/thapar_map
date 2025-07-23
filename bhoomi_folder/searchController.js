// controllers/searchController.js
const buildings = require('../model/build');
const floors = require('../model/floor');
const rooms = require('../model/roomname');

exports.searchBuilding = async (req, res) => {
  const { type, name, room } = req.query;

  try {
    const building = buildings.find(b => b.name === name && b.type === type);
    if (!building) return res.status(404).json({ message: "Building not found" });

    const buildingFloors = floors.filter(f => f.buildingId === building.id);
    if (!buildingFloors.length) return res.status(404).json({ message: "Floors not found" });

    const floorIds = buildingFloors.map(f => f.id);
    const foundRoom = rooms.find(r => r.roomNumber === room && floorIds.includes(r.floorId));
    if (!foundRoom) return res.status(404).json({ message: "Room not found" });
    
    const foundFloor = buildingFloors.find(f => f.id === foundRoom.floorId);
    const result = {
      buildingName: building.name,
      buildingType: building.type,
      floor: foundFloor.floorNumber,
      room: foundRoom.roomNumber,
      coordinates: foundRoom.coordinates
    };

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};