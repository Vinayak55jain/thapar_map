import React, { useState, useEffect, useRef } from "react";

const MapViewWithRoadNetwork = ({ onMarkerClick, searchTerm, selectedRoute, startLocation }) => {
  // Your existing fixed locations data
  const fixedLocations = [
    {"id": 1753104495924.8704, "name": "N Hostel", "lat": 30.354449176922227, "lng": 76.36766173032088},
    {"id": 1753104495924.0195, "name": "G Hostel", "lat": 30.354250761445382, "lng": 76.36695340159781},
    {"id": 1753104495924.547, "name": "E Hostel", "lat": 30.35502822243716, "lng": 76.36676029989822},
    {"id": 1753104495924.8943, "name": "K Hostel", "lat": 30.357008868949034, "lng": 76.36378867929879},
    {"id": 1753104495924.4724, "name": "FRG ", "lat": 30.354861624173303, "lng": 76.35927224510259},
    {"id": 1753104495924.0015, "name": "FRF", "lat": 30.35444512727253, "lng": 76.35931515659136},
    {"id": 1753104495924.7556, "name": "Faculty Residence", "lat": 30.35351031666178, "lng": 76.36014120275078},
    {"id": 1753104495924.5154, "name": "Athletic Track", "lat": 30.35437108319344, "lng": 76.36145000315919},
    {"id": 1753104495924.0828, "name": "Fete Area ", "lat": 30.35421373933931, "lng": 76.3643143450366},
    {"id": 1753104495924.0745, "name": "COS", "lat": 30.354361827679625, "lng": 76.36251206250698},
    {"id": 1753104495924.8716, "name": "Cricket Ground", "lat": 30.355694612655608, "lng": 76.3638745022764},
    {"id": 1753104495924.6282, "name": "Tennis Court: 1 (near Fete Area)", "lat": 30.354917156959456, "lng": 76.36443235163078},
    {"id": 1753104495924.0864, "name": "Tennis Court (2)", "lat": 30.35534290727261, "lng": 76.36430361716441},
    {"id": 1753104495924.1711, "name": "VolleyBall Court", "lat": 30.35520407585235, "lng": 76.36516184694041},
    {"id": 1753104495924.944, "name": "Indoor Badminton Court", "lat": 30.35472279207006, "lng": 76.3652905814068},
    {"id": 1753104495924.733, "name": "BasketBall Court", "lat": 30.355139287788784, "lng": 76.36598789309981},
    {"id": 1753104495924.4912, "name": "Swimming Pool", "lat": 30.354306294578265, "lng": 76.36604153246081},
    {"id": 1753104495924.7158, "name": "Polytechnic Building", "lat": 30.35750865191976, "lng": 76.36746833946344},
    {"id": 1753104495924.564, "name": "Q Hostel", "lat": 30.351973875858437, "lng": 76.36756489031325},
    {"id": 1753104495924.093, "name": "PG Hostel", "lat": 30.351622157100188, "lng": 76.36579479140023},
    {"id": 1753104495924.4224, "name": "Shiv Mandir", "lat": 30.352482940243018, "lng": 76.36279098718418},
    {"id": 1753104495924.102, "name": "Gurudwara", "lat": 30.352186757650554, "lng": 76.36261934122896},
    {"id": 1753104495924.8994, "name": "Mechanical Workshop", "lat": 30.35456544878154, "lng": 76.37189895068201},
    {"id": 1753104495924.5999, "name": "Venture Lab", "lat": 30.355639080310763, "lng": 76.37207059663724},
    {"id": 1753104495924.9133, "name": "Library (Nava Nalanda)", "lat": 30.354375217823588, "lng": 76.37001124276688},
    {"id": 1753104495924.3613, "name": "G Block", "lat": 30.353509823530974, "lng": 76.36949094096516},
    {"id": 1753104495924.7588, "name": "TAN", "lat": 30.353542218107663, "lng": 76.36854152427549},
    {"id": 1753104495924.5815, "name": "Kravings", "lat": 30.353579240467845, "lng": 76.36723272386708},
    {"id": 1753104495924.3843, "name": "G Block Canteen", "lat": 30.35277862880445, "lng": 76.36897063916348},
    {"id": 1753104495924.6504, "name": "Guest House", "lat": 30.351839170532145, "lng": 76.36930856858356},
    {"id": 1753104495924.2893, "name": "Stationary (Near NesCafe)", "lat": 30.35252409384975, "lng": 76.36998442453216},
    {"id": 1753104495924.9407, "name": "NesCafe", "lat": 30.352653673397523, "lng": 76.36990932942675},
    {"id": 1753104495924.9324, "name": "SBOP Lawns", "lat": 30.351922472272815, "lng": 76.3700112442127},
    {"id": 1753104495924.5476, "name": "C Block", "lat": 30.353477425080957, "lng": 76.37073537558618},
    {"id": 1753104495924.1428, "name": "B Block", "lat": 30.353010016269035, "lng": 76.37112157898537},
    {"id": 1753104495924.1218, "name": "Main Audi", "lat": 30.351978006727208, "lng": 76.37073537558618},
    {"id": 1753104495924.037, "name": "D Block", "lat": 30.353907809438088, "lng": 76.37070319196958},
    {"id": 1753104495924.3015, "name": "F Block", "lat": 30.35394483165993, "lng": 76.37199053663356},
    {"id": 1753104495924.9912, "name": "E Block", "lat": 30.353482052879823, "lng": 76.37228555311908},
    {"id": 1753104495924.7615, "name": "H Block", "lat": 30.353269173905908, "lng": 76.37284876640958},
    {"id": 1753104495924.6182, "name": "Aahar Canteen (E Block)", "lat": 30.35290820415247, "lng": 76.37221045801368},
    {"id": 1753104495924.9583, "name": "Student's Parking", "lat": 30.352639789882762, "lng": 76.37256447779627},
    {"id": 1753104495924.413, "name": "Main Gate", "lat": 30.3520763430311, "lng": 76.37371178469758},
    {"id": 1753104495924.7412, "name": "Dean's Office", "lat": 30.355260262506654, "lng": 76.37047196729313},
    {"id": 1753104495924.6304, "name": "COS Parking", "lat": 30.353649804558884, "lng": 76.3629088173921},
    {"id": 1753104495924.8717, "name": "H Hostel", "lat": 30.352900099575137, "lng": 76.3647647392827},
    {"id": 1753104495924.1821, "name": "J Hostel", "lat": 30.352742753355365, "lng": 76.36337011589669},
    {"id": 1753104495924.0657, "name": "LT Lawn", "lat": 30.354908555562204, "lng": 76.36861604540252},
    {"id": 1753104495924.653, "name": "R&D Gate", "lat": 30.355713777489736, "lng": 76.37277845981615}
  ];

  // Campus Road Network - Safe pathways avoiding ALL buildings
  const roadNetwork = {
    nodes: [
      // Main entrance area (safe zone)
      { id: "main_gate", lat: 30.3520763430311, lng: 76.37371178469758, name: "Main Gate" },
      { id: "main_gate_parking", lat: 30.35222014704304, lng: 76.37272837951849, name: "Main Gate Parking" },
      
      // Main road approach (between buildings)
      { id: "entrance_road", lat: 30.352450, lng: 76.37200, name: "Entrance Road" },
      { id: "admin_approach", lat: 30.352650, lng: 76.37120, name: "Admin Approach" },
      
      // Central academic walkway (open area between G Block and other buildings)
      { id: "central_plaza", lat: 30.353200, lng: 76.37000, name: "Central Plaza" },
      { id: "library_approach", lat: 30.354000, lng: 76.37050, name: "Library Approach" },
      
      // G Block / TAN area (open walkways)
      { id: "g_block_front", lat: 30.353600, lng: 76.36920, name: "G Block Front" },
      { id: "tan_walkway", lat: 30.353600, lng: 76.36830, name: "TAN Walkway" },
      
      // Central campus green area walkway (through Nirvana park area)
      { id: "park_entrance", lat: 30.353400, lng: 76.36780, name: "Park Entrance" },
      { id: "nirvana_north", lat: 30.353400, lng: 76.36720, name: "Nirvana North" },
      { id: "nirvana_center", lat: 30.353188, lng: 76.36706, name: "Nirvana Center" },
      { id: "nirvana_south", lat: 30.352900, lng: 76.36680, name: "Nirvana South" },
      
      // Eastern walkway (along green areas, avoiding buildings)
      { id: "east_walkway_1", lat: 30.354200, lng: 76.36800, name: "East Walkway 1" },
      { id: "east_walkway_2", lat: 30.354400, lng: 76.36650, name: "East Walkway 2" },
      { id: "hostel_area_safe", lat: 30.354200, lng: 76.36600, name: "Hostel Area Safe" },
      
      // Sports area pathways (through open green spaces)
      { id: "sports_approach", lat: 30.354300, lng: 76.36480, name: "Sports Approach" },
      { id: "athletic_track_edge", lat: 30.354100, lng: 76.36200, name: "Athletic Track Edge" },
      
      // Southern route (through open areas)
      { id: "south_green_1", lat: 30.352200, lng: 76.36800, name: "South Green 1" },
      { id: "south_green_2", lat: 30.352000, lng: 76.36650, name: "South Green 2" },
      { id: "guest_house_area", lat: 30.351900, lng: 76.36900, name: "Guest House Area" },
      
      // Western faculty area (avoiding residential buildings)
      { id: "faculty_safe_zone", lat: 30.353800, lng: 76.36100, name: "Faculty Safe Zone" },
      { id: "west_open_area", lat: 30.354200, lng: 76.36000, name: "West Open Area" },
    ],
    
    // Safe connections avoiding ALL buildings (gray areas)
    edges: [
      // Main entrance route (safe roadway)
      { from: "main_gate", to: "main_gate_parking", distance: 80 },
      { from: "main_gate_parking", to: "entrance_road", distance: 90 },
      { from: "entrance_road", to: "admin_approach", distance: 80 },
      { from: "admin_approach", to: "central_plaza", distance: 100 },
      
      // Academic area safe walkways
      { from: "central_plaza", to: "library_approach", distance: 90 },
      { from: "central_plaza", to: "g_block_front", distance: 80 },
      { from: "g_block_front", to: "tan_walkway", distance: 70 },
      
      // Through green park areas (Nirvana meditation park)
      { from: "tan_walkway", to: "park_entrance", distance: 50 },
      { from: "park_entrance", to: "nirvana_north", distance: 60 },
      { from: "nirvana_north", to: "nirvana_center", distance: 30 },
      { from: "nirvana_center", to: "nirvana_south", distance: 40 },
      
      // Eastern safe walkway (along building edges, not through them)
      { from: "library_approach", to: "east_walkway_1", distance: 70 },
      { from: "east_walkway_1", to: "east_walkway_2", distance: 120 },
      { from: "east_walkway_2", to: "hostel_area_safe", distance: 60 },
      { from: "nirvana_north", to: "east_walkway_2", distance: 80 },
      
      // Sports area through open green spaces
      { from: "hostel_area_safe", to: "sports_approach", distance: 70 },
      { from: "sports_approach", to: "athletic_track_edge", distance: 150 },
      { from: "nirvana_south", to: "sports_approach", distance: 100 },
      
      // Southern green route
      { from: "park_entrance", to: "south_green_1", distance: 80 },
      { from: "south_green_1", to: "south_green_2", distance: 100 },
      { from: "south_green_2", to: "nirvana_south", distance: 60 },
      { from: "south_green_1", to: "guest_house_area", distance: 120 },
      { from: "guest_house_area", to: "central_plaza", distance: 140 },
      
      // Western faculty area (through open spaces)
      { from: "nirvana_center", to: "faculty_safe_zone", distance: 130 },
      { from: "faculty_safe_zone", to: "west_open_area", distance: 80 },
      { from: "west_open_area", to: "athletic_track_edge", distance: 100 },
      
      // Additional safe cross-connections
      { from: "g_block_front", to: "east_walkway_1", distance: 90 },
      { from: "tan_walkway", to: "south_green_1", distance: 70 },
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
            <defs>
              {/* Arrow marker for direction */}
              <marker
                id="arrowhead"
                markerWidth="12"
                markerHeight="10"
                refX="10"
                refY="5"
                orient="auto"
              >
                <polygon
                  points="0 0, 12 5, 0 10"
                  fill="#dc3545"
                />
              </marker>
            </defs>
            
            {/* Path outline for better visibility */}
            <path
              d={generateSVGPath()}
              stroke="white"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.8 }}
            />
            
            {/* Main path following roads */}
            <path
              d={generateSVGPath()}
              stroke="#007bff"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              markerEnd="url(#arrowhead)"
              style={{
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                strokeDasharray: '10, 5',
                animation: 'dashMove 2s linear infinite'
              }}
            />
            
            {/* Waypoint markers */}
            {pathPoints.map((point, index) => (
              index > 0 && index < pathPoints.length - 1 && index % 2 === 0 && (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill="#ffc107"
                  stroke="white"
                  strokeWidth="2"
                  style={{
                    animation: `dotPulse 1.5s ease-in-out ${index * 0.2}s infinite alternate`
                  }}
                />
              )
            ))}
          </svg>
        )}

        {/* Road Network Visualization (Optional - for debugging) */}
        {false && ( // Set to true to see road network
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 20
            }}
          >
            {/* Road network edges */}
            {roadNetwork.edges.map((edge, index) => {
              const fromNode = roadNetwork.nodes.find(n => n.id === edge.from);
              const toNode = roadNetwork.nodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;
              
              const fromPixel = latLngToPixel(fromNode.lat, fromNode.lng);
              const toPixel = latLngToPixel(toNode.lat, toNode.lng);
              
              return (
                <line
                  key={index}
                  x1={fromPixel.x}
                  y1={fromPixel.y}
                  x2={toPixel.x}
                  y2={toPixel.y}
                  stroke="rgba(255,0,0,0.3)"
                  strokeWidth="2"
                />
              );
            })}
            
            {/* Road network nodes */}
            {roadNetwork.nodes.map((node, index) => {
              const pixel = latLngToPixel(node.lat, node.lng);
              return (
                <circle
                  key={index}
                  cx={pixel.x}
                  cy={pixel.y}
                  r="3"
                  fill="red"
                  opacity="0.5"
                />
              );
            })}
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
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '4px solid #28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                zIndex: 50,
                transform: 'translate(-50%, -50%)',
                animation: 'pulse 2s infinite',
                pointerEvents: 'none'
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: `${latLngToPixel(startLocation.lat, startLocation.lng).x}px`,
                top: `${latLngToPixel(startLocation.lat, startLocation.lng).y}px`,
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                zIndex: 100,
                transform: 'translate(-50%, -50%)',
                animation: 'markerReveal 0.5s ease-out'
              }}
              onClick={() => {
                if (onMarkerClick) {
                  onMarkerClick(startLocation, () => {});
                }
              }}
              title={`START: ${startLocation.name}`}
            >
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#28a745',
                borderRadius: '50%',
                border: '4px solid white',
                boxShadow: '0 4px 12px rgba(40, 167, 69, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}>
                🚀
              </div>
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
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '4px solid #dc3545',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                zIndex: 50,
                transform: 'translate(-50%, -50%)',
                animation: 'pulse 2s infinite',
                pointerEvents: 'none'
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: `${latLngToPixel(matchedLocation.lat, matchedLocation.lng).x}px`,
                top: `${latLngToPixel(matchedLocation.lat, matchedLocation.lng).y}px`,
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                zIndex: 100,
                transform: 'translate(-50%, -50%)',
                animation: 'markerReveal 0.5s ease-out'
              }}
              onClick={() => {
                if (onMarkerClick) {
                  onMarkerClick(matchedLocation, deleteMarker);
                }
              }}
              title={`END: ${matchedLocation.name}`}
            >
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#dc3545',
                borderRadius: '50%',
                border: '4px solid white',
                boxShadow: '0 4px 12px rgba(220, 53, 69, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}>
                🎯
              </div>
            </div>
          </>
        )}

        {/* Path Information Panel */}
        {pathPoints.length > 0 && selectedRoute?.start && selectedRoute?.end && (
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

        {/* Road Network Toggle Button (for debugging) */}
        <button
          onClick={() => {
            // Toggle road network visibility
            const svg = document.querySelector('svg[style*="z-index: 20"]');
            if (svg) {
              svg.style.display = svg.style.display === 'none' ? 'block' : 'none';
            }
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '120px',
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '2px solid #007bff',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          🛣️ Show Roads
        </button>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes markerReveal {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes dashMove {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 15;
          }
        }

        @keyframes dotPulse {
          0% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default MapViewWithRoadNetwork;