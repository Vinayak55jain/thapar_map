import React, { useState, useEffect, useRef } from "react";

const MapView = ({ onMarkerClick, searchTerm, selectedRoute, startLocation }) => {
  // Your existing fixed locations data
  const fixedLocations = [
{"id": 1754284737534.6897, "name": "N Hostel", "lat": 30.354449176922227, "lng": 76.36766173032088},
{"id": 1754284737534.2192, "name": "G Hostel", "lat": 30.354250761445382, "lng": 76.36695340159781},
{"id": 1754284737534.3462, "name": "E Hostel", "lat": 30.35502822243716, "lng": 76.36676029989822},
{"id": 1754284737534.8044, "name": "K Hostel", "lat": 30.357008868949034, "lng": 76.36378867929879},
{"id": 1754284737534.4036, "name": "FRG ", "lat": 30.354861624173303, "lng": 76.35927224510259},
{"id": 1754284737534.5073, "name": "FRF", "lat": 30.35444512727253, "lng": 76.35931515659136},
{"id": 1754284737534.3914, "name": "Faculty Residence", "lat": 30.35351031666178, "lng": 76.36014120275078},
{"id": 1754284737534.5156, "name": "Athletic Track", "lat": 30.35437108319344, "lng": 76.36145000315919},
{"id": 1754284737534.5513, "name": "Fete Area ", "lat": 30.35421373933931, "lng": 76.3643143450366},
{"id": 1754284737534.5125, "name": "COS", "lat": 30.354361827679625, "lng": 76.36251206250698},
{"id": 1754284737534.4966, "name": "Cricket Ground", "lat": 30.355694612655608, "lng": 76.3638745022764},
{"id": 1754284737534.524, "name": "Tennis Court: 1 (near Fete Area)", "lat": 30.354917156959456, "lng": 76.36443235163078},
{"id": 1754284737534.8413, "name": "Tennis Court (2)", "lat": 30.35534290727261, "lng": 76.36430361716441},
{"id": 1754284737534.4504, "name": "VolleyBall Court", "lat": 30.35520407585235, "lng": 76.36516184694041},
{"id": 1754284737534.7583, "name": "Indoor Badminton Court", "lat": 30.35472279207006, "lng": 76.3652905814068},
{"id": 1754284737534.0317, "name": "BasketBall Court", "lat": 30.355139287788784, "lng": 76.36598789309981},
{"id": 1754284737534.5232, "name": "Swimming Pool", "lat": 30.354306294578265, "lng": 76.36604153246081},
{"id": 1754284737534.057, "name": "Polytechnic Building", "lat": 30.35750865191976, "lng": 76.36746833946344},
{"id": 1754284737534.909, "name": "Q Hostel", "lat": 30.351973875858437, "lng": 76.36756489031325},
{"id": 1754284737534.388, "name": "PG Hostel", "lat": 30.351622157100188, "lng": 76.36579479140023},
{"id": 1754284737534.3555, "name": "Shiv Mandir", "lat": 30.352482940243018, "lng": 76.36279098718418},
{"id": 1754284737534.4302, "name": "Gurudwara", "lat": 30.352186757650554, "lng": 76.36261934122896},
{"id": 1754284737534.3828, "name": "Mechanical Workshop", "lat": 30.35456544878154, "lng": 76.37189895068201},
{"id": 1754284737534.4358, "name": "Venture Lab", "lat": 30.355639080310763, "lng": 76.37207059663724},
{"id": 1754284737534.7683, "name": "Library (Nava Nalanda)", "lat": 30.354375217823588, "lng": 76.37001124276688},
{"id": 1754284737534.4604, "name": "G Block", "lat": 30.353509823530974, "lng": 76.36949094096516},
{"id": 1754284737534.2632, "name": "TAN", "lat": 30.353542218107663, "lng": 76.36854152427549},
{"id": 1754284737534.8105, "name": "Kravings", "lat": 30.353579240467845, "lng": 76.36723272386708},
{"id": 1754284737534.4475, "name": "G Block Canteen", "lat": 30.35277862880445, "lng": 76.36897063916348},
{"id": 1754284737534.4746, "name": "Guest House", "lat": 30.351839170532145, "lng": 76.36930856858356},
{"id": 1754284737534.9539, "name": "Stationary (Near NesCafe)", "lat": 30.35252409384975, "lng": 76.36998442453216},
{"id": 1754284737534.411, "name": "NesCafe", "lat": 30.352653673397523, "lng": 76.36990932942675},
{"id": 1754284737534.5693, "name": "SBOP Lawns", "lat": 30.351922472272815, "lng": 76.3700112442127},
{"id": 1754284737534.0847, "name": "C Block", "lat": 30.353477425080957, "lng": 76.37073537558618},
{"id": 1754284737534.5088, "name": "B Block", "lat": 30.353010016269035, "lng": 76.37112157898537},
{"id": 1754284737534.242, "name": "Main Audi", "lat": 30.351978006727208, "lng": 76.37073537558618},
{"id": 1754284737534.7925, "name": "D Block", "lat": 30.353907809438088, "lng": 76.37070319196958},
{"id": 1754284737534.4258, "name": "F Block", "lat": 30.35394483165993, "lng": 76.37199053663356},
{"id": 1754284737534.5715, "name": "E Block", "lat": 30.353482052879823, "lng": 76.37228555311908},
{"id": 1754284737534.365, "name": "H Block", "lat": 30.353269173905908, "lng": 76.37284876640958},
{"id": 1754284737534.9326, "name": "Aahar Canteen (E Block)", "lat": 30.35290820415247, "lng": 76.37221045801368},
{"id": 1754284737534.4583, "name": "Student's Parking", "lat": 30.352639789882762, "lng": 76.37256447779627},
{"id": 1754284737534.925, "name": "Main Gate", "lat": 30.3520763430311, "lng": 76.37371178469758},
{"id": 1754284737534.0999, "name": "Dean's Office", "lat": 30.355260262506654, "lng": 76.37047196729313},
{"id": 1754284737534.4915, "name": "COS Parking", "lat": 30.353649804558884, "lng": 76.3629088173921},
{"id": 1754284737534.48, "name": "H Hostel", "lat": 30.352900099575137, "lng": 76.3647647392827},
{"id": 1754284737534.9502, "name": "J Hostel", "lat": 30.352742753355365, "lng": 76.36337011589669},
{"id": 1754284737534.7295, "name": "LT Lawn", "lat": 30.354908555562204, "lng": 76.36861604540252},
{"id": 1754284737534.2434, "name": "R&D Gate", "lat": 30.355713777489736, "lng": 76.37277845981615},
{"id": 1754284737534.7146, "name": "M Hostel", "lat": 30.35235401455113, "lng": 76.3607096035911},
{"id": 1754284737534.069, "name": "M Hostel (A Block)", "lat": 30.352835309985874, "lng": 76.36093488890731},
{"id": 1754284737534.21, "name": "M Hostel (B Block)", "lat": 30.352400293061212, "lng": 76.3613103644343},
{"id": 1754284737534.8628, "name": "M Hostel (C Block)", "lat": 30.352002297159324, "lng": 76.36106362337368},
{"id": 1754284737534.3992, "name": "B Hostel", "lat": 30.351502486059267, "lng": 76.36315555845272},
{"id": 1754284737534.9666, "name": "C Hostel", "lat": 30.351169277240846, "lng": 76.36092416103507},
{"id": 1754284737534.9192, "name": "D Hostel", "lat": 30.35117853305671, "lng": 76.36007665913131},
{"id": 1754284737534.3972, "name": "O Hostel", "lat": 30.351353904112262, "lng": 76.36233994522449},
{"id": 1754284737534.6304, "name": "A Hostel", "lat": 30.35164083345455, "lng": 76.3643675130703},
{"id": 1754284737534.9575, "name": "Admin's Office", "lat": 30.352649707364836, "lng": 76.37171610552734},
{"id": 1754284737534.7656, "name": "Residency Area (Staff Quarters)", "lat": 30.3564722269746, "lng": 76.36901268173294},
{"id": 1754284737534.8586, "name": "Streat Cafe", "lat": 30.352613572027284, "lng": 76.37085496960208},
{"id": 1754284737534.3193, "name": "Jaggi", "lat": 30.352624500476477, "lng": 76.37060952284833},
{"id": 1754284737534.9963, "name": "SBI", "lat": 30.352464216432516, "lng": 76.37034403962488},
{"id": 1754284737534.7688, "name": "Post Office", "lat": 30.352624500476477, "lng": 76.37031398492034},
{"id": 1754284737534.784, "name": "Main Gate Parking", "lat": 30.35222014704304, "lng": 76.37272837951849},
{"id": 1754284737534.364, "name": "Skywalk (Girl's Hostel Entry)", "lat": 30.35394898871258, "lng": 76.36806593846525},
{"id": 1754284737534.092, "name": "Skywalk ( near Mechanical Workshop)", "lat": 30.354885175322757, "lng": 76.37146712919582},
{"id": 1754284737534.4941, "name": "LT Building", "lat": 30.354554765165744, "lng": 76.36911670734055},
{"id": 1754284737534.5195, "name": "BioTech Building", "lat": 30.35562828983411, "lng": 76.36801083817359},
{"id": 1754284737534.966, "name": "Nirvana", "lat": 30.353188707406307, "lng": 76.36706517220985},
{"id": 1754284737534.218, "name": "Activity Space", "lat": 30.35500351609864, "lng": 76.36895803381655},
{"id": 1754284737534.5232, "name": "TSLAS Canteen", "lat": 30.35676123455582, "lng": 76.37154745206001},
{"id": 1754284737534.4656, "name": "L Hostel", "lat": 30.357441621381714, "lng": 76.36637051880867},
{"id": 1754284737534.0776, "name": "I Hostel", "lat": 30.355157641654902, "lng": 76.36775906689086},
{"id": 1754284737534.8699, "name": "TSLAS", "lat": 30.35629257645881, "lng": 76.37213099557408},
{"id": 1754284737534.9897, "name": "CSED", "lat": 30.355444764685718, "lng": 76.37004115390897},
{"id": 1754284737534.9417, "name": "Health Centre", "lat": 30.355953807055595, "lng": 76.36908649360784},
{"id": 1754284737534.1934, "name": "Waterbody Cafe", "lat": 30.35490714617021, "lng": 76.37017003194354},
{"id": 1754284781560, "name": "K Lawns", "lat": 30.352705145719533, "lng": 76.371221071135}
  ];

  // Campus Road Network - Safe pathways avoiding ALL buildings
const roadNetwork = {
  nodes: [
    // === 14 REAL CAMPUS CHOWKS ===
    { id: "audi_chowk", lat: 30.35171479160775, lng: 76.37033076995536, name: "Audi Chowk", type: "major_intersection" },
    { id: "pg_chowk", lat: 30.35115019272135, lng: 76.36546092976774, name: "PG Chowk", type: "major_intersection" },
    { id: "boys_chowk", lat: 30.3523719435859, lng: 76.36526785240348, name: "Boys Chowk", type: "major_intersection" },
    { id: "h_chowk", lat: 30.353593679195065, lng: 76.36509622807968, name: "H Chowk", type: "major_intersection" },
    { id: "library_chowk", lat: 30.35417677490316, lng: 76.36999824782801, name: "Library Chowk", type: "major_intersection" },
    { id: "cos_chowk", lat: 30.353427079783053, lng: 76.36291874447153, name: "COS Chowk", type: "major_intersection" },
    { id: "boys_interior_chowk", lat: 30.352057251640026, lng: 76.36302600967394, name: "Boys Interior Chowk", type: "major_intersection" },
    { id: "sports_chowk", lat: 30.355333700543923, lng: 76.36477443247256, name: "Sports Chowk", type: "major_intersection" },
    { id: "f_block_chowk", lat: 30.354463693737788, lng: 76.37226154359801, name: "F Block Chowk", type: "major_intersection" },
    { id: "rd_gate_chowk", lat: 30.35600933879026, lng: 76.37249752704322, name: "R&D Gate Chowk", type: "major_intersection" },
    { id: "k_hostel_chowk", lat: 30.35691635266101, lng: 76.36451699598688, name: "K Hostel Chowk", type: "major_intersection" },
    { id: "parking_chowk", lat: 30.352297898513232, lng: 76.37215427839564, name: "Parking Chowk", type: "major_intersection" },
    { id: "frg_chowk", lat: 30.35302909115046, lng: 76.3592502745505, name: "FRG Chowk", type: "major_intersection" },
    { id: "l_hostel_chowk", lat: 30.356342528536292, lng: 76.36605088838077, name: "L Hostel Chowk", type: "major_intersection" },
    { id: "health_centre_chowk", lat: 30.355555828701412, lng: 76.36620105966409, name: "Health Centre Chowk", type: "major_intersection" },

    // Building access points
    { id: "health_centre_access", lat: 30.355953807055595, lng: 76.36908649360784, name: "Health Centre Access", type: "building_access" },
    { id: "biotech_access", lat: 30.35562828983411, lng: 76.36801083817359, name: "BioTech Access", type: "building_access" },
    { id: "badminton_court_access", lat: 30.35472279207006, lng: 76.3652905814068, name: "Indoor Badminton Court Access", type: "building_access" },
    // === 23 BUILDING ENTRIES ===
    { id: "q_entry", lat: 30.351400097548332, lng: 76.36796020898296, name: "Q Entry", type: "building_entry" },
    { id: "pg_entry", lat: 30.351603723231747, lng: 76.3654823828082, name: "PG Entry", type: "building_entry" },
    { id: "nirvana_entry", lat: 30.353732511821722, lng: 76.36697336912115, name: "Nirvana Entry", type: "building_entry" },
    { id: "igen_entry", lat: 30.353926877168075, lng: 76.36742388297111, name: "I,G,E,N Entry", type: "building_entry" },
    { id: "lt_cut", lat: 30.354167519442857, lng: 76.36923666489116, name: "LT Cut", type: "building_entry" },
    { id: "m_hostel_entry", lat: 30.353084619251174, lng: 76.36096651778843, name: "M Hostel Entry", type: "building_entry" },
    { id: "d_hostel_entry", lat: 30.350613352677716, lng: 76.36038728569561, name: "D Hostel Entry", type: "building_entry" },
    { id: "c_hostel_entry", lat: 30.35073367796385, lng: 76.36154574988119, name: "C Hostel Entry", type: "building_entry" },
    { id: "o_hostel_entry", lat: 30.350798468441248, lng: 76.36208207589307, name: "O Hostel entry 1", type: "building_entry" },
    { id: "b_hostel_entry", lat: 30.35091879349978, lng: 76.36295092403228, name: "B Hostel Entry", type: "building_entry" },
    { id: "a_hostel_entry", lat: 30.351103908685495, lng: 76.36464571422974, name: "A Hostel Entry", type: "building_entry" },
    { id: "frg_entry", lat: 30.354926458984707, lng: 76.3589713850243, name: "FRG Entry", type: "building_entry" },
    { id: "frf_entry", lat: 30.354435922141754, lng: 76.35904647066597, name: "FRF Entry", type: "building_entry" },
    { id: "c_block_entry", lat: 30.353436330019335, lng: 76.37022350475299, name: "C Block Entry", type: "building_entry" },
    { id: "be_block_entry", lat: 30.352982808003382, lng: 76.37032004343511, name: "B, E Block Entry", type: "building_entry" },
    { id: "g_block_entry", lat: 30.35284397431292, lng: 76.37004115390897, name: "G Block Entry", type: "building_entry" },
    { id: "tan_entry", lat: 30.35390836090533, lng: 76.36844290239364, name: "TAN Entry", type: "building_entry" },
    { id: "bank_nescafe_entry", lat: 30.352538539500472, lng: 76.37022350475299, name: "Bank Nescafe Entry", type: "building_entry" },
    { id: "h_hostel_entry", lat: 30.35315866902254, lng: 76.36506404851895, name: "H Hostel Entry", type: "building_entry" },
    { id: "j_hostel_entry", lat: 30.353371541288617, lng: 76.36337998484174, name: "J Hostel Entry", type: "building_entry" },
    { id: "k_hostel_entry", lat: 30.356870071352827, lng: 76.36372323348934, name: "K Hostel Entry", type: "building_entry" },
    { id: "l_hostel_entry", lat: 30.357490168126024, lng: 76.3659758027391, name: "L Hostel Entry", type: "building_entry" },
    { id: "guest_house_entry", lat: 30.35161297364044, lng: 76.36957991353874, name: "Guest House Entry", type: "building_entry" },
{ id: "swimming_pool_entry", lat: 30.353788044817232, lng: 76.36612597402244, name: "Swimming Pool Entry", type: "building_entry" },
    
    // === ORIGINAL BUILDING ACCESS POINTS (for compatibility) ===
    { id: "q_hostel_access", lat: 30.351973875858437, lng: 76.36756489031325, name: "Q Hostel Access", type: "building_access" },
    { id: "lt_lawn_access", lat: 30.354908555562204, lng: 76.36861604540252, name: "LT Lawn Access", type: "building_access" },
    { id: "g_block_access", lat: 30.353509823530974, lng: 76.36949094096516, name: "G Block Access", type: "building_access" },
    { id: "aahar_canteen_access", lat: 30.35290820415247, lng: 76.37221045801368, name: "Aahar Canteen Access", type: "building_access" },
    { id: "tslas_access", lat: 30.35629257645881, lng: 76.37213099557408, name: "TSLAS Access", type: "building_access" },
    { id: "i_hostel_access", lat: 30.355157641654902, lng: 76.36775906689086, name: "I Hostel Access", type: "building_access" }, 
    { id: "g_hostel_access", lat: 30.354250761445382, lng: 76.36695340159781, name: "G Hostel Access", type: "building_access" },
    { id: "n_hostel_access", lat: 30.354449176922227, lng: 76.36766173032088, name: "N Hostel Access", type: "building_access" },
    { id: "e_hostel_access", lat: 30.35502822243716, lng: 76.36676029989822, name: "E Hostel Access", type: "building_access" },
    { id: "nescafe_access", lat: 30.352653673397523, lng: 76.36990932942675, name: "NesCafe Access", type: "building_access" },
    { id: "stationary_near_nescafe_access", lat: 30.35252409384975, lng: 76.36998442453216, name: "Stationary (Near NesCafe) Access", type: "building_access" },
    { id: "streat_cafe_access", lat: 30.352613572027284, lng: 76.37085496960208, name: "Streat Cafe Access", type: "building_access" },
    { id: "jaggi_access", lat: 30.352624500476477, lng: 76.37060952284833, name: "Jaggi Access", type: "building_access" },
    { id: "sbi_access", lat: 30.352464216432516, lng: 76.37034403962488, name: "SBI Access", type: "building_access" },
    { id: "post_office_access", lat: 30.352624500476477, lng: 76.37031398492034, name: "Post Office Access", type: "building_access" },
    { id: "k_lawns_access", lat: 30.352705145719533, lng: 76.371221071135, name: "K Lawns Access", type: "building_access" },
    { id: "health_centre_entry", lat: 30.355842743491696, lng: 76.36918303229, name: "Health Centre Entry", type: "building_entry" },
    { id: "biotech_entry", lat: 30.355611360661968, lng: 76.36807820070558, name: "Biotech Entry", type: "building_entry" },
    { id: "athletic_track_access", lat: 30.35437108319344, lng: 76.36145000315919, name: "Athletic Track Access", type: "building_access" },
    { id: "g_block_canteen_access", lat: 30.35277862880445, lng: 76.36897063916348, name: "G Block Canteen Access", type: "building_access" },
  ],
  
  edges: [
    // === MAIN CAMPUS SPINE (North-South) ===
    { from: "library_chowk", to: "audi_chowk", distance: 271, road_type: "main" },
    { from: "audi_chowk", to: "parking_chowk", distance: 185, road_type: "main" },
    { from: "f_block_chowk", to: "rd_gate_chowk", distance: 150, road_type: "main" },
    { from: "rd_gate_chowk", to: "tslas_access", distance: 47, road_type: "secondary" },
    { from: "f_block_chowk", to: "rd_gate_chowk", distance: 173, road_type: "main" },
    // Add this to your edges array in the roadNetwork object:
{ from: "h_chowk", to: "m_hostel_entry", distance: 280, road_type: "secondary" },
    
    // === EAST-WEST CONNECTIONS ===
    { from: "library_chowk", to: "h_chowk", distance: 471, road_type: "main" },
    { from: "h_chowk", to: "sports_chowk", distance: 180, road_type: "secondary" },
    { from: "sports_chowk", to: "k_hostel_chowk", distance: 220, road_type: "secondary" },
    { from: "k_hostel_chowk", to: "l_hostel_chowk", distance: 180, road_type: "secondary" },
    
    // === SOUTHERN NETWORK ===
    { from: "pg_chowk", to: "boys_chowk", distance: 125, road_type: "secondary" },
    { from: "boys_chowk", to: "h_chowk", distance: 120, road_type: "secondary" },
    { from: "audi_chowk", to: "pg_chowk", distance: 473, road_type: "main" },
    { from: "boys_chowk", to: "boys_interior_chowk", distance: 220, road_type: "secondary" },
    // Chowk-to-chowk connections
    { from: "health_centre_chowk", to: "sports_chowk", distance: 139, road_type: "secondary" },
    { from: "health_centre_chowk", to: "l_hostel_chowk", distance: 89, road_type: "secondary" },
    // Add to your edges array:
    { from: "pg_chowk", to: "sports_chowk", distance: 471, road_type: "secondary" },
    

    // Building connections
    { from: "health_centre_chowk", to: "health_centre_access", distance: 280, road_type: "pedestrian" },
    { from: "health_centre_chowk", to: "biotech_access", distance: 174, road_type: "pedestrian" },

    { from: "h_chowk", to: "swimming_pool_entry", distance: 140, road_type: "secondary" },
    { from: "library_chowk", to: "swimming_pool_entry", distance: 320, road_type: "secondary" },

    // === WESTERN NETWORK ===
    { from: "cos_chowk", to: "h_chowk", distance: 250, road_type: "secondary" },
    { from: "cos_chowk", to: "boys_interior_chowk", distance: 180, road_type: "secondary" },
    { from: "frg_chowk", to: "cos_chowk", distance: 340, road_type: "secondary" },
    { from: "pg_chowk", to: "h_hostel_entry", distance: 150, road_type: "secondary" },
    { from: "boys_chowk", to: "h_hostel_entry", distance: 120, road_type: "secondary" },
    
    // === BUILDING ENTRY CONNECTIONS ===
    
    // Q Hostel Area
    { from: "audi_chowk", to: "q_entry", distance: 280, road_type: "secondary" },
    { from: "q_entry", to: "q_hostel_access", distance: 50, road_type: "pedestrian" },
    
    // PG Area
    { from: "pg_chowk", to: "pg_entry", distance: 60, road_type: "secondary" },
    { from: "pg_entry", to: "boys_chowk", distance: 88, road_type: "secondary" },

    { from: "boys_chowk", to: "h_chowk", distance: 180, road_type: "secondary" }, // ADD THIS
    { from: "cos_chowk", to: "library_chowk", distance: 220, road_type: "secondary" }, // ADD THIS

    { from: "q_entry", to: "pg_chowk", distance: 150, road_type: "secondary" }, // ADD THIS
    { from: "q_entry", to: "guest_house_entry", distance: 157, road_type: "secondary" },
        // Direct connections from PG Chowk to southern hostels
    { from: "pg_chowk", to: "d_hostel_entry", distance: 490, road_type: "secondary" },
    { from: "pg_chowk", to: "b_hostel_entry", distance: 242, road_type: "secondary" },
    { from: "pg_chowk", to: "c_hostel_entry", distance: 379, road_type: "secondary" },
    { from: "pg_chowk", to: "o_hostel_entry", distance: 327, road_type: "secondary" },
    { from: "pg_chowk", to: "a_hostel_entry", distance: 78, road_type: "secondary" },
        
    // Academic Area
    { from: "library_chowk", to: "lt_cut", distance: 120, road_type: "secondary" },
    { from: "lt_cut", to: "lt_lawn_access", distance: 80, road_type: "pedestrian" },
    { from: "library_chowk", to: "c_block_entry", distance: 100, road_type: "secondary" },
    { from: "audi_chowk", to: "c_block_entry", distance: 100, road_type: "secondary" },
    { from: "audi_chowk", to: "g_block_entry", distance: 80, road_type: "secondary" },
    { from: "audi_chowk", to: "be_block_entry", distance: 90, road_type: "secondary" },
    { from: "audi_chowk", to: "bank_nescafe_entry", distance: 120, road_type: "secondary" },
    { from: "g_block_entry", to: "g_block_access", distance: 91, road_type: "pedestrian" },
    
    // Hostel Entries
    { from: "h_chowk", to: "h_hostel_entry", distance: 40, road_type: "secondary" },
    { from: "h_chowk", to: "j_hostel_entry", distance: 50, road_type: "secondary" },
    { from: "k_hostel_chowk", to: "k_hostel_entry", distance: 80, road_type: "secondary" },
    { from: "l_hostel_chowk", to: "l_hostel_entry", distance: 120, road_type: "secondary" },
    { from: "frg_chowk", to: "m_hostel_entry", distance: 180, road_type: "secondary" },
    { from: "g_block_entry", to: "g_block_canteen_access", distance: 103, road_type: "pedestrian" },
    { from: "g_block_entry", to: "library_chowk", distance: 148, road_type: "secondary" },
    // Connect badminton court to both chowks
{ from: "sports_chowk", to: "badminton_court_access", distance: 120, road_type: "secondary" },
{ from: "h_chowk", to: "badminton_court_access", distance: 180, road_type: "secondary" },
        
    // Faculty Area
    { from: "frg_chowk", to: "frg_entry", distance: 60, road_type: "secondary" },
    { from: "frg_chowk", to: "frf_entry", distance: 80, road_type: "secondary" },
    
    // Special Entries
    { from: "h_chowk", to: "nirvana_entry", distance: 150, road_type: "pedestrian" },
    { from: "h_chowk", to: "igen_entry", distance: 200, road_type: "secondary" },
    { from: "library_chowk", to: "tan_entry", distance: 180, road_type: "secondary" },
    { from: "audi_chowk", to: "guest_house_entry", distance: 150, road_type: "secondary" },



    
    // === CROSS CONNECTIONS FOR ALTERNATIVE ROUTES ===
    { from: "h_chowk", to: "cos_chowk", distance: 250, road_type: "secondary" },
    { from: "library_chowk", to: "f_block_chowk", distance: 225, road_type: "secondary" },

    { from: "igen_entry", to: "i_hostel_access", distance: 62, road_type: "secondary" },
    { from: "igen_entry", to: "g_hostel_access", distance: 58, road_type: "secondary" },
    { from: "igen_entry", to: "n_hostel_access", distance: 62, road_type: "secondary" },
    { from: "igen_entry", to: "e_hostel_access", distance: 138, road_type: "secondary" },
    { from: "igen_entry", to: "h_chowk", distance: 226, road_type: "secondary" },
    { from: "igen_entry", to: "library_chowk", distance: 249, road_type: "secondary" },

    { from: "bank_nescafe_entry", to: "nescafe_access", distance: 33, road_type: "pedestrian" },
    { from: "bank_nescafe_entry", to: "stationary_near_nescafe_access", distance: 23, road_type: "pedestrian" },
    { from: "bank_nescafe_entry", to: "streat_cafe_access", distance: 61, road_type: "pedestrian" },
    { from: "bank_nescafe_entry", to: "jaggi_access", distance: 38, road_type: "pedestrian" },
    { from: "bank_nescafe_entry", to: "sbi_access", distance: 14, road_type: "pedestrian" },
    { from: "bank_nescafe_entry", to: "post_office_access", distance: 13, road_type: "pedestrian" },
    { from: "bank_nescafe_entry", to: "k_lawns_access", distance: 97, road_type: "pedestrian" },
    { from: "bank_nescafe_entry", to: "library_chowk", distance: 183, road_type: "secondary" },
    { from: "health_centre_chowk", to: "health_centre_entry", distance: 288, road_type: "pedestrian" },
    { from: "health_centre_chowk", to: "biotech_entry", distance: 180, road_type: "pedestrian" },
    { from: "lt_lawn_access", to: "health_centre_entry", distance: 117, road_type: "pedestrian" },
    { from: "lt_lawn_access", to: "biotech_entry", distance: 94, road_type: "pedestrian" },
    { from: "cos_chowk", to: "athletic_track_access", distance: 176, road_type: "secondary" },
    { from: "be_block_entry", to: "library_chowk", distance: 182, road_type: "secondary" },
    
  ]
};

  const [markers] = useState(fixedLocations);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [calibrationOffset] = useState({ x: 0, y: 0 });
  const [scalingFactor] = useState({ x: 0.8, y: 1.0 });
  const containerRef = useRef(null);
  
  // State for path
  const [pathPoints, setPathPoints] = useState([]);

  // Find matched location based on searchTerm
  const matchedLocation = searchTerm && searchTerm.trim() !== '' ? markers.find(marker =>
    marker.name.toLowerCase() === searchTerm.toLowerCase()
  ) : null;

  // Map bounds
  const mapBounds = {
    north: 30.358564125140035,
    south: 30.350229165566694,
    east: 76.37352553975813,
    west: 76.35887596437992
  };

  // Update container dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Generate path when both start and end locations are available
  useEffect(() => {
    if (selectedRoute?.start && selectedRoute?.end) {
      findPathAlongRoads(selectedRoute.start, selectedRoute.end);
    } else {
      setPathPoints([]);
    }
  }, [selectedRoute, containerDimensions]);

  // Coordinate conversion function
  const latLngToPixel = (lat, lng) => {
    if (containerDimensions.width === 0 || containerDimensions.height === 0) {
      return { x: 0, y: 0 };
    }

    const rawXPercent = (lng - mapBounds.west) / (mapBounds.east - mapBounds.west);
    const rawYPercent = (mapBounds.north - lat) / (mapBounds.north - mapBounds.south);
    
    const edgeCorrectionX = (percent) => {
      const centered = percent - 0.5;
      const corrected = centered + (centered * Math.abs(centered) * 0.1);
      return corrected + 0.5;
    };
    
    const edgeCorrectionY = (percent) => {
      const centered = percent - 0.5;
      const corrected = centered + (centered * Math.abs(centered) * 0.08);
      return corrected + 0.5;
    };
    
    const correctedXPercent = edgeCorrectionX(rawXPercent);
    const correctedYPercent = edgeCorrectionY(rawYPercent);
    
    const baseX = correctedXPercent * containerDimensions.width;
    const baseY = correctedYPercent * containerDimensions.height;
    
    const centerX = containerDimensions.width / 2;
    const centerY = containerDimensions.height / 2;
    
    const scaledX = centerX + (baseX - centerX) * scalingFactor.x;
    const scaledY = centerY + (baseY - centerY) * scalingFactor.y;
    
    const finalX = scaledX + calibrationOffset.x;
    const finalY = scaledY + calibrationOffset.y;
    
    const x = Math.round(finalX * 10) / 10;
    const y = Math.round(finalY * 10) / 10;
    
    return { x, y };
  };

  // Find closest road node to a location
  const findClosestRoadNode = (location) => {
    let closest = null;
    let minDistance = Infinity;
    
    roadNetwork.nodes.forEach(node => {
      const distance = Math.sqrt(
        Math.pow(node.lat - location.lat, 2) + 
        Math.pow(node.lng - location.lng, 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closest = node;
      }
    });
    
    return closest;
  };

  // Simple pathfinding using Dijkstra's algorithm
  const findPathAlongRoads = (startLoc, endLoc) => {
    // Find closest road nodes to start and end
    const startNode = findClosestRoadNode(startLoc);
    const endNode = findClosestRoadNode(endLoc);
    
    if (!startNode || !endNode) {
      setPathPoints([]);
      return;
    }

    // Build adjacency list
    const graph = {};
    roadNetwork.nodes.forEach(node => {
      graph[node.id] = [];
    });
    
    roadNetwork.edges.forEach(edge => {
      graph[edge.from].push({ node: edge.to, distance: edge.distance });
      graph[edge.to].push({ node: edge.from, distance: edge.distance });
    });

    // Dijkstra's algorithm
    const distances = {};
    const previous = {};
    const unvisited = new Set();
    
    roadNetwork.nodes.forEach(node => {
      distances[node.id] = Infinity;
      previous[node.id] = null;
      unvisited.add(node.id);
    });
    
    distances[startNode.id] = 0;
    
    while (unvisited.size > 0) {
      // Find unvisited node with minimum distance
      let current = null;
      let minDist = Infinity;
      
      for (let nodeId of unvisited) {
        if (distances[nodeId] < minDist) {
          minDist = distances[nodeId];
          current = nodeId;
        }
      }
      
      if (current === null) break;
      
      unvisited.delete(current);
      
      if (current === endNode.id) break;
      
      // Update distances to neighbors
      if (graph[current]) {
        graph[current].forEach(neighbor => {
          if (unvisited.has(neighbor.node)) {
            const newDist = distances[current] + neighbor.distance;
            if (newDist < distances[neighbor.node]) {
              distances[neighbor.node] = newDist;
              previous[neighbor.node] = current;
            }
          }
        });
      }
    }
    
    // Reconstruct path
    const pathNodeIds = [];
    let current = endNode.id;
    
    while (current !== null) {
      pathNodeIds.unshift(current);
      current = previous[current];
    }
    
    // Convert to coordinates including start and end locations
    const pathCoords = [];
    
    // Add start location
    pathCoords.push(latLngToPixel(startLoc.lat, startLoc.lng));
    
    // Add road nodes
    pathNodeIds.forEach(nodeId => {
      const node = roadNetwork.nodes.find(n => n.id === nodeId);
      if (node) {
        pathCoords.push(latLngToPixel(node.lat, node.lng));
      }
    });
    
    // Add end location
    pathCoords.push(latLngToPixel(endLoc.lat, endLoc.lng));
    
    setPathPoints(pathCoords);
  };

  // Generate SVG path string
  const generateSVGPath = () => {
    if (pathPoints.length < 2) return '';
    
    let path = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
    
    for (let i = 1; i < pathPoints.length; i++) {
      path += ` L ${pathPoints[i].x} ${pathPoints[i].y}`;
    }
    
    return path;
  };

  // Function to delete a marker
  const deleteMarker = (markerId) => {
    console.log('Delete disabled - locations are fixed');
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Custom Map Container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: '100vh',
          width: '100vw',
          backgroundImage: 'url("/thapar-campus.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden'
        }}
      >
{/* SVG Overlay for Path */}
{pathPoints.length > 0 && (
  <svg
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 30
    }}
  >
    {/* Path shadow */}
    <path
      d={generateSVGPath()}
      stroke="rgba(0,0,0,0.15)"
      strokeWidth="8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: 'blur(2px)' }}
    />
    
    {/* Main path */}
    <path
      d={generateSVGPath()}
      stroke="#007bff"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Animated dashes */}
    <path
      d={generateSVGPath()}
      stroke="rgba(255,255,255,0.9)"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        strokeDasharray: '6, 12',
        animation: 'simpleFlow 2s linear infinite'
      }}
    />
  </svg>
)}

{/* START Location Marker */}
{startLocation && (
  <>
    <div
      style={{
        position: 'absolute',
        left: `${latLngToPixel(startLocation.lat, startLocation.lng).x}px`,
        top: `${latLngToPixel(startLocation.lat, startLocation.lng).y}px`,
        fontSize: '32px',
        cursor: 'pointer',
        zIndex: 100,
        transform: 'translate(-50%, -100%)',
        animation: 'pinBounce 0.6s ease-out',
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
        transition: 'transform 0.2s ease'
      }}
      onClick={() => {
        if (onMarkerClick) {
          onMarkerClick(startLocation, () => {});
        }
      }}
      onMouseEnter={(e) => e.target.style.transform = 'translate(-50%, -100%) scale(1.1)'}
      onMouseLeave={(e) => e.target.style.transform = 'translate(-50%, -100%) scale(1)'}
      title={`START: ${startLocation.name}`}
    >
      📍
    </div>

    {/* Label */}
    <div
      style={{
        position: 'absolute',
        left: `${latLngToPixel(startLocation.lat, startLocation.lng).x}px`,
        top: `${latLngToPixel(startLocation.lat, startLocation.lng).y + 8}px`,
        transform: 'translateX(-50%)',
        backgroundColor: '#007bff',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '8px',
        fontSize: '10px',
        fontWeight: 'bold',
        zIndex: 90,
        animation: 'fadeInUp 0.5s ease-out 0.3s both',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 6px rgba(0, 123, 255, 0.2)'
      }}
    >
      START
    </div>
  </>
)}

{/* END Location Marker */}
{matchedLocation && searchTerm && (
  <>
    <div
      style={{
        position: 'absolute',
        left: `${latLngToPixel(matchedLocation.lat, matchedLocation.lng).x}px`,
        top: `${latLngToPixel(matchedLocation.lat, matchedLocation.lng).y}px`,
        fontSize: '32px',
        cursor: 'pointer',
        zIndex: 100,
        transform: 'translate(-50%, -100%)',
        animation: 'pinBounce 0.6s ease-out 0.2s both',
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) hue-rotate(20deg)',
        transition: 'transform 0.2s ease'
      }}
      onClick={() => {
        if (onMarkerClick) {
          onMarkerClick(matchedLocation, deleteMarker);
        }
      }}
      onMouseEnter={(e) => e.target.style.transform = 'translate(-50%, -100%) scale(1.1)'}
      onMouseLeave={(e) => e.target.style.transform = 'translate(-50%, -100%) scale(1)'}
      title={`END: ${matchedLocation.name}`}
    >
      📍
    </div>

    {/* Label */}
    <div
      style={{
        position: 'absolute',
        left: `${latLngToPixel(matchedLocation.lat, matchedLocation.lng).x}px`,
        top: `${latLngToPixel(matchedLocation.lat, matchedLocation.lng).y + 8}px`,
        transform: 'translateX(-50%)',
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '8px',
        fontSize: '10px',
        fontWeight: 'bold',
        zIndex: 90,
        animation: 'fadeInUp 0.5s ease-out 0.5s both',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 6px rgba(220, 53, 69, 0.2)'
      }}
    >
      END
    </div>
  </>
)}

        {/* Path Information Panel */}
        {/*pathPoints.length > 0 && selectedRoute?.start && selectedRoute?.end && (
          <div style={{
            position: 'absolute',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '16px 24px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333',
            zIndex: 1000,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              🗺️ Route: {selectedRoute.start.name} → {selectedRoute.end.name}
            </div>
            <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
              📏 Following campus roads • {pathPoints.length} waypoints
            </div>
          </div>
        )}

{/* No Search Message */}
{(!searchTerm || searchTerm.trim() === '') && !startLocation && (
  <div style={{
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '14px',
    zIndex: 200,
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }}>
    🔍 Select start location (GPS) and search for destination
  </div>
)}

{/* Logo in bottom left corner */}
<img 
  src="acm_logo.png" 
  alt="Logo" 
  style={{
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    height: '60px',        // Increased from 50px to 70px
    width: 'auto',
    zIndex: 200,
    filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.2))'
  }}
/>

      </div>

      {/* CSS Animations */}
<style>{`
  @keyframes simplePulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.3;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.1;
    }
  }

  @keyframes bounceIn {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }
    60% {
      transform: translate(-50%, -50%) scale(1.15);
      opacity: 0.8;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

@keyframes simpleFlow {
  0% {
    stroke-dashoffset: 18;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

  @keyframes simpleDotPulse {
    0%, 100% {
      opacity: 0.5;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.3);
    }
  }

  @keyframes slideUp {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
`}</style>
    </div>
  );
};

export default MapView;