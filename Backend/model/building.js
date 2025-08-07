// sport (football, basketball, etc.) loction
const pool = require('./db');
const cat=require('./category');
const room =require('./roomname');

const getBuildingsByCategoryName = async (categoryName) => {
  const cat_id = await cat.getCategoryByName(categoryName);
  if (!cat_id) {
    console.log(`Category "${categoryName}" not found.`);
    return [];
  }

  const result = await pool.query('SELECT * FROM building WHERE cat_id = $1', [cat_id]);
  const jsonResult = JSON.stringify(result.rows); // Convert to JSON string

console.log(jsonResult); // Output the JSON
return jsonResult;
};

const location= async (room_no)=>{
  const b_id= await room.getBuildingId(room_no);
  const building=  await pool.query("SELECT * FROM building where id =$1",[b_id]);
  const loc_id= building.rows[0].loc_id;
  const location= await pool.query("Select * from location where loc_id=$1",[loc_id]);
  const result= JSON.stringify(location.rows);
  console.log(result);
  return result;
}

// getBuildingsByCategoryName("Academic");
location("B-105");
module.exports = {
  getBuildingsByCategoryName,
  location
};
