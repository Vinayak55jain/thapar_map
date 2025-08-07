// home page basic map with marker
//sreach for the room
//details about the path ya room location

const pool=require("./db");
const getBuildingId= async (room_no)=>{

    
    const result= await pool.query("SELECT * FROM rooms where room_no =$1",[room_no]);

    if (result.rows.length === 0) {
    console.log(`Room "${room_no}" not found.`);
    return null;
  }

    const buildingId=result.rows[0].b_id;
    console.log(buildingId);
    return buildingId;
}
// getBuildingId('AUDITORIUM');

module.exports={
    getBuildingId
} ;