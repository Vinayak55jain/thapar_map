import React, { useState, useEffect, useRef } from "react";

const MapView = ({ onMarkerClick, searchTerm, onSearchSubmit, selectedRoute, startLocation }) => {
  // Fixed locations data - permanently embedded
  const fixedLocations = [

  {
    "id": 1753375295328.3276,
    "name": "N Hostel",
    "lat": 30.354449176922227,
    "lng": 76.36766173032088,
    "timestamp": "7/18/2025, 1:49:52 PM"
  },
  {
    "id": 1753375295328.0647,
    "name": "G Hostel",
    "lat": 30.354250761445382,
    "lng": 76.36695340159781,
    "timestamp": "7/18/2025, 1:50:19 PM"
  },
  {
    "id": 1753375295328.814,
    "name": "E Hostel",
    "lat": 30.35502822243716,
    "lng": 76.36676029989822,
    "timestamp": "7/18/2025, 1:51:00 PM"
  },
  {
    "id": 1753375295328.0999,
    "name": "K Hostel",
    "lat": 30.357008868949034,
    "lng": 76.36378867929879,
    "timestamp": "7/18/2025, 1:51:09 PM"
  },
  {
    "id": 1753375295328.1934,
    "name": "FRG ",
    "lat": 30.354861624173303,
    "lng": 76.35927224510259,
    "timestamp": "7/18/2025, 1:51:17 PM"
  },
  {
    "id": 1753375295328.456,
    "name": "FRF",
    "lat": 30.35444512727253,
    "lng": 76.35931515659136,
    "timestamp": "7/18/2025, 1:51:23 PM"
  },
  {
    "id": 1753375295328.0945,
    "name": "Faculty Residence",
    "lat": 30.35351031666178,
    "lng": 76.36014120275078,
    "timestamp": "7/18/2025, 1:51:33 PM"
  },
  {
    "id": 1753375295328.5894,
    "name": "Athletic Track",
    "lat": 30.35437108319344,
    "lng": 76.36145000315919,
    "timestamp": "7/18/2025, 1:51:45 PM"
  },
  {
    "id": 1753375295328.6194,
    "name": "Fete Area ",
    "lat": 30.35421373933931,
    "lng": 76.3643143450366,
    "timestamp": "7/18/2025, 1:52:07 PM"
  },
  {
    "id": 1753375295328.0916,
    "name": "COS",
    "lat": 30.354361827679625,
    "lng": 76.36251206250698,
    "timestamp": "7/18/2025, 1:52:14 PM"
  },
  {
    "id": 1753375295328.8801,
    "name": "Cricket Ground",
    "lat": 30.355694612655608,
    "lng": 76.3638745022764,
    "timestamp": "7/18/2025, 1:52:31 PM"
  },
  {
    "id": 1753375295328.557,
    "name": "Tennis Court: 1 (near Fete Area)",
    "lat": 30.354917156959456,
    "lng": 76.36443235163078,
    "timestamp": "7/18/2025, 1:53:07 PM"
  },
  {
    "id": 1753375295328.6409,
    "name": "Tennis Court (2)",
    "lat": 30.35534290727261,
    "lng": 76.36430361716441,
    "timestamp": "7/18/2025, 1:53:31 PM"
  },
  {
    "id": 1753375295328.23,
    "name": "VolleyBall Court",
    "lat": 30.35520407585235,
    "lng": 76.36516184694041,
    "timestamp": "7/18/2025, 1:53:46 PM"
  },
  {
    "id": 1753375295328.0825,
    "name": "Indoor Badminton Court",
    "lat": 30.35472279207006,
    "lng": 76.3652905814068,
    "timestamp": "7/18/2025, 1:53:59 PM"
  },
  {
    "id": 1753375295328.8872,
    "name": "BasketBall Court",
    "lat": 30.355139287788784,
    "lng": 76.36598789309981,
    "timestamp": "7/18/2025, 1:54:15 PM"
  },
  {
    "id": 1753375295328.8142,
    "name": "Swimming Pool",
    "lat": 30.354306294578265,
    "lng": 76.36604153246081,
    "timestamp": "7/18/2025, 1:54:29 PM"
  },
  {
    "id": 1753375295328.0085,
    "name": "Polytechnic Building",
    "lat": 30.35750865191976,
    "lng": 76.36746833946344,
    "timestamp": "7/18/2025, 1:54:39 PM"
  },
  {
    "id": 1753375295328.8928,
    "name": "Q Hostel",
    "lat": 30.351973875858437,
    "lng": 76.36756489031325,
    "timestamp": "7/18/2025, 1:55:33 PM"
  },
  {
    "id": 1753375295328.7075,
    "name": "PG Hostel",
    "lat": 30.351622157100188,
    "lng": 76.36579479140023,
    "timestamp": "7/18/2025, 1:55:42 PM"
  },
  {
    "id": 1753375295328.1184,
    "name": "Shiv Mandir",
    "lat": 30.352482940243018,
    "lng": 76.36279098718418,
    "timestamp": "7/18/2025, 1:55:58 PM"
  },
  {
    "id": 1753375295328.2214,
    "name": "Gurudwara",
    "lat": 30.352186757650554,
    "lng": 76.36261934122896,
    "timestamp": "7/18/2025, 1:56:05 PM"
  },
  {
    "id": 1753375295328.0898,
    "name": "Mechanical Workshop",
    "lat": 30.35456544878154,
    "lng": 76.37189895068201,
    "timestamp": "7/18/2025, 1:56:30 PM"
  },
  {
    "id": 1753375295328.1868,
    "name": "Venture Lab",
    "lat": 30.355639080310763,
    "lng": 76.37207059663724,
    "timestamp": "7/18/2025, 1:56:37 PM"
  },
  {
    "id": 1753375295328.6616,
    "name": "Library (Nava Nalanda)",
    "lat": 30.354375217823588,
    "lng": 76.37001124276688,
    "timestamp": "7/18/2025, 2:53:22 PM"
  },
  {
    "id": 1753375295328.923,
    "name": "G Block",
    "lat": 30.353509823530974,
    "lng": 76.36949094096516,
    "timestamp": "7/18/2025, 2:53:38 PM"
  },
  {
    "id": 1753375295328.4668,
    "name": "TAN",
    "lat": 30.353542218107663,
    "lng": 76.36854152427549,
    "timestamp": "7/18/2025, 2:53:44 PM"
  },
  {
    "id": 1753375295328.8213,
    "name": "Kravings",
    "lat": 30.353579240467845,
    "lng": 76.36723272386708,
    "timestamp": "7/18/2025, 2:53:54 PM"
  },
  {
    "id": 1753375295328.77,
    "name": "G Block Canteen",
    "lat": 30.35277862880445,
    "lng": 76.36897063916348,
    "timestamp": "7/18/2025, 2:54:19 PM"
  },
  {
    "id": 1753375295328.2969,
    "name": "Guest House",
    "lat": 30.351839170532145,
    "lng": 76.36930856858356,
    "timestamp": "7/18/2025, 2:54:30 PM"
  },
  {
    "id": 1753375295328.1802,
    "name": "Stationary (Near NesCafe)",
    "lat": 30.35252409384975,
    "lng": 76.36998442453216,
    "timestamp": "7/18/2025, 2:55:00 PM"
  },
  {
    "id": 1753375295328.2046,
    "name": "NesCafe",
    "lat": 30.352653673397523,
    "lng": 76.36990932942675,
    "timestamp": "7/18/2025, 2:55:12 PM"
  },
  {
    "id": 1753375295328.612,
    "name": "SBOP Lawns",
    "lat": 30.351922472272815,
    "lng": 76.3700112442127,
    "timestamp": "7/18/2025, 2:55:26 PM"
  },
  {
    "id": 1753375295328.9043,
    "name": "C Block",
    "lat": 30.353477425080957,
    "lng": 76.37073537558618,
    "timestamp": "7/18/2025, 2:55:35 PM"
  },
  {
    "id": 1753375295328.326,
    "name": "B Block",
    "lat": 30.353010016269035,
    "lng": 76.37112157898537,
    "timestamp": "7/18/2025, 2:55:41 PM"
  },
  {
    "id": 1753375295328.6428,
    "name": "Main Audi",
    "lat": 30.351978006727208,
    "lng": 76.37073537558618,
    "timestamp": "7/18/2025, 2:56:05 PM"
  },
  {
    "id": 1753375295328.203,
    "name": "D Block",
    "lat": 30.353907809438088,
    "lng": 76.37070319196958,
    "timestamp": "7/18/2025, 2:56:12 PM"
  },
  {
    "id": 1753375295328.2446,
    "name": "F Block",
    "lat": 30.35394483165993,
    "lng": 76.37199053663356,
    "timestamp": "7/18/2025, 2:56:18 PM"
  },
  {
    "id": 1753375295328.47,
    "name": "E Block",
    "lat": 30.353482052879823,
    "lng": 76.37228555311908,
    "timestamp": "7/18/2025, 2:56:25 PM"
  },
  {
    "id": 1753375295328.3408,
    "name": "H Block",
    "lat": 30.353269173905908,
    "lng": 76.37284876640958,
    "timestamp": "7/18/2025, 2:56:32 PM"
  },
  {
    "id": 1753375295328.9797,
    "name": "Aahar Canteen (E Block)",
    "lat": 30.35290820415247,
    "lng": 76.37221045801368,
    "timestamp": "7/18/2025, 2:56:55 PM"
  },
  {
    "id": 1753375295328.8108,
    "name": "Student's Parking",
    "lat": 30.352639789882762,
    "lng": 76.37256447779627,
    "timestamp": "7/18/2025, 2:57:14 PM"
  },
  {
    "id": 1753375295328.6704,
    "name": "Main Gate",
    "lat": 30.3520763430311,
    "lng": 76.37371178469758,
    "timestamp": "7/18/2025, 2:57:37 PM"
  },
  {
    "id": 1753375295328.4866,
    "name": "Dean's Office",
    "lat": 30.355260262506654,
    "lng": 76.37047196729313,
    "timestamp": "7/18/2025, 2:57:52 PM"
  },
  {
    "id": 1753375295328.4304,
    "name": "COS Parking",
    "lat": 30.353649804558884,
    "lng": 76.3629088173921,
    "timestamp": "7/18/2025, 2:58:21 PM"
  },
  {
    "id": 1753375295328.1902,
    "name": "H Hostel",
    "lat": 30.352900099575137,
    "lng": 76.3647647392827,
    "timestamp": "7/18/2025, 2:58:33 PM"
  },
  {
    "id": 1753375295328.9363,
    "name": "J Hostel",
    "lat": 30.352742753355365,
    "lng": 76.36337011589669,
    "timestamp": "7/18/2025, 2:58:41 PM"
  },
  {
    "id": 1753375295328.741,
    "name": "LT Lawn",
    "lat": 30.354908555562204,
    "lng": 76.36861604540252,
    "timestamp": "7/18/2025, 2:59:09 PM"
  },
  {
    "id": 1753375295328.9595,
    "name": "R&D Gate",
    "lat": 30.355713777489736,
    "lng": 76.37277845981615,
    "timestamp": "7/18/2025, 3:00:43 PM"
  },
  {
    "id": 1753375295328.3193,
    "name": "M Hostel",
    "lat": 30.35235401455113,
    "lng": 76.3607096035911,
    "timestamp": "7/18/2025, 3:04:23 PM"
  },
  {
    "id": 1753375295328.8564,
    "name": "M Hostel (A Block)",
    "lat": 30.352835309985874,
    "lng": 76.36093488890731,
    "timestamp": "7/18/2025, 3:04:36 PM"
  },
  {
    "id": 1753375295328.4023,
    "name": "M Hostel (B Block)",
    "lat": 30.352400293061212,
    "lng": 76.3613103644343,
    "timestamp": "7/18/2025, 3:04:46 PM"
  },
  {
    "id": 1753375295328.518,
    "name": "M Hostel (C Block)",
    "lat": 30.352002297159324,
    "lng": 76.36106362337368,
    "timestamp": "7/18/2025, 3:05:07 PM"
  },
  {
    "id": 1753375295328.781,
    "name": "B Hostel",
    "lat": 30.351502486059267,
    "lng": 76.36315555845272,
    "timestamp": "7/18/2025, 3:05:44 PM"
  },
  {
    "id": 1753375295328.1897,
    "name": "C Hostel",
    "lat": 30.351169277240846,
    "lng": 76.36092416103507,
    "timestamp": "7/18/2025, 3:05:56 PM"
  },
  {
    "id": 1753375295328.636,
    "name": "D Hostel",
    "lat": 30.35117853305671,
    "lng": 76.36007665913131,
    "timestamp": "7/18/2025, 3:06:03 PM"
  },
  {
    "id": 1753375295328.0413,
    "name": "O Hostel",
    "lat": 30.351353904112262,
    "lng": 76.36233994522449,
    "timestamp": "7/18/2025, 3:07:10 PM"
  },
  {
    "id": 1753375295328.218,
    "name": "A Hostel",
    "lat": 30.35164083345455,
    "lng": 76.3643675130703,
    "timestamp": "7/18/2025, 3:08:50 PM"
  },
  {
    "id": 1753375295328.0737,
    "name": "Admin's Office",
    "lat": 30.352649707364836,
    "lng": 76.37171610552734,
    "timestamp": "7/18/2025, 3:09:43 PM"
  },
  {
    "id": 1753375295328.549,
    "name": "Residency Area (Staff Quarters)",
    "lat": 30.3564722269746,
    "lng": 76.36901268173294,
    "timestamp": "7/18/2025, 3:10:12 PM"
  },
  {
    "id": 1753375295328.8757,
    "name": "Streat Cafe",
    "lat": 30.352613572027284,
    "lng": 76.37085496960208,
    "timestamp": "7/19/2025, 11:02:49 AM"
  },
  {
    "id": 1753375295328.7878,
    "name": "Jaggi",
    "lat": 30.352624500476477,
    "lng": 76.37060952284833,
    "timestamp": "7/19/2025, 11:02:59 AM"
  },
  {
    "id": 1753375295328.2722,
    "name": "SBI",
    "lat": 30.352464216432516,
    "lng": 76.37034403962488,
    "timestamp": "7/19/2025, 11:03:06 AM"
  },
  {
    "id": 1753375295328.064,
    "name": "Post Office",
    "lat": 30.352624500476477,
    "lng": 76.37031398492034,
    "timestamp": "7/19/2025, 11:03:15 AM"
  },
  {
    "id": 1753375295328.4177,
    "name": "Main Gate Parking",
    "lat": 30.35222014704304,
    "lng": 76.37272837951849,
    "timestamp": "7/19/2025, 11:03:38 AM"
  },
  {
    "id": 1753375295328.0046,
    "name": "Skywalk (Girl's Hostel Entry)",
    "lat": 30.35394898871258,
    "lng": 76.36806593846525,
    "timestamp": "7/19/2025, 11:07:35 AM"
  },
  {
    "id": 1753375295328.3713,
    "name": "Skywalk ( near Mechanical Workshop)",
    "lat": 30.354885175322757,
    "lng": 76.37146712919582,
    "timestamp": "7/19/2025, 11:08:27 AM"
  },
  {
    "id": 1753375295328.4507,
    "name": "LT Building",
    "lat": 30.354554765165744,
    "lng": 76.36911670734055,
    "timestamp": "7/19/2025, 11:13:42 AM"
  },
  {
    "id": 1753375295328.3145,
    "name": "BioTech Building",
    "lat": 30.35562828983411,
    "lng": 76.36801083817359,
    "timestamp": "7/19/2025, 11:16:23 AM"
  },
  {
    "id": 1753375295328.4163,
    "name": "Nirvana",
    "lat": 30.353188707406307,
    "lng": 76.36706517220985,
    "timestamp": "7/19/2025, 11:20:40 AM"
  },
  {
    "id": 1753375295328.3225,
    "name": "Activity Space",
    "lat": 30.35500351609864,
    "lng": 76.36895803381655,
    "timestamp": "7/19/2025, 11:34:11 AM"
  },
  {
    "id": 1753375295328.3726,
    "name": "TSLAS Canteen",
    "lat": 30.35676123455582,
    "lng": 76.37154745206001,
    "timestamp": "21/7/2025, 6:43:55 pm"
  },
  {
    "id": 1753375295328.0164,
    "name": "L Hostel",
    "lat": 30.357441621381714,
    "lng": 76.36637051880867,
    "timestamp": "21/7/2025, 6:44:10 pm"
  },
  {
    "id": 1753375295328.444,
    "name": "I Hostel",
    "lat": 30.355157641654902,
    "lng": 76.36775906689086,
    "timestamp": "21/7/2025, 6:44:57 pm"
  },
  {
    "id": 1753375295328.2993,
    "name": "TSLAS",
    "lat": 30.35629257645881,
    "lng": 76.37213099557408,
    "timestamp": "21/7/2025, 7:05:20 pm"
  },
  {
    "id": 1753375942301,
    "name": "CSED",
    "lat": 30.355444764685718,
    "lng": 76.37004115390897,
    "timestamp": "24/7/2025, 10:22:22 pm"
  },
  {
    "id": 1753375959202,
    "name": "Health Centre",
    "lat": 30.355953807055595,
    "lng": 76.36908649360784,
    "timestamp": "24/7/2025, 10:22:39 pm"
  },
  {
    "id": 1753376059163,
    "name": "Waterbody Cafe",
    "lat": 30.35490714617021,
    "lng": 76.37017003194354,
    "timestamp": "24/7/2025, 10:24:19 pm"
  }

  ];

  // Load fixed locations - always the same 78 locations
  const [markers] = useState(fixedLocations);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [calibrationOffset] = useState({ x: 0, y: 0 });
  const [scalingFactor] = useState({ x: 0.8, y: 1.0 }); // HARDCODED: Perfect alignment values
  const containerRef = useRef(null);

  // Find matched location based on searchTerm (now only when confirmed via Enter)
  const matchedLocation = searchTerm && searchTerm.trim() !== '' ? markers.find(marker =>
    marker.name.toLowerCase() === searchTerm.toLowerCase()
  ) : null;

  console.log('MapView: searchTerm (confirmed):', searchTerm);
  console.log('MapView: matchedLocation:', matchedLocation);

  // Your NEW screenshot bounds from MapView
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

  // Handle search submission (triggered by Enter key in SearchBar)
  useEffect(() => {
    console.log('MapView: searchTerm changed to:', searchTerm);
    // No need for useEffect logic - searchTerm now comes pre-confirmed from HomePage
  }, [searchTerm]);

  // ADVANCED PRECISION coordinate conversion with multiple correction methods
  const latLngToPixel = (lat, lng) => {
    if (containerDimensions.width === 0 || containerDimensions.height === 0) {
      return { x: 0, y: 0 };
    }

    // Method 1: High-precision linear interpolation with edge correction
    const rawXPercent = (lng - mapBounds.west) / (mapBounds.east - mapBounds.west);
    const rawYPercent = (mapBounds.north - lat) / (mapBounds.north - mapBounds.south);
    
    // Method 2: Apply non-linear correction for edge distortion
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
    
    // Apply edge corrections
    const correctedXPercent = edgeCorrectionX(rawXPercent);
    const correctedYPercent = edgeCorrectionY(rawYPercent);
    
    // Method 3: High-precision pixel calculation with sub-pixel accuracy
    const baseX = correctedXPercent * containerDimensions.width;
    const baseY = correctedYPercent * containerDimensions.height;
    
    // Method 4: Apply scaling with center-point preservation
    const centerX = containerDimensions.width / 2;
    const centerY = containerDimensions.height / 2;
    
    // Scale relative to center point to maintain accuracy
    const scaledX = centerX + (baseX - centerX) * scalingFactor.x;
    const scaledY = centerY + (baseY - centerY) * scalingFactor.y;
    
    // Method 5: Apply calibration offset with sub-pixel precision
    const finalX = scaledX + calibrationOffset.x;
    const finalY = scaledY + calibrationOffset.y;
    
    // Method 6: Round to nearest 0.1 pixel for crisp rendering
    const x = Math.round(finalX * 10) / 10;
    const y = Math.round(finalY * 10) / 10;
    
    return { x, y };
  };

  // Function to delete a marker (disabled for fixed locations)
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
          backgroundImage: 'url("/demo1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden'
        }}
      >
        {/* START Location Marker - Show when start is selected */}
        {startLocation && (
          <>
            {/* START Highlight Circle/Boundary */}
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

            {/* The START Marker */}
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
                console.log('🚀 START MARKER CLICKED:', startLocation.name);
                
                if (onMarkerClick) {
                  onMarkerClick(startLocation, () => {});
                } else {
                  console.error('🚀 onMarkerClick function is missing!');
                }
              }}
              title={`START: ${startLocation.name}`}
            >
              {/* Enhanced START Marker Design */}
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
                transition: 'all 0.3s ease',
                animation: 'bounce 0.6s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2)';
                e.currentTarget.style.zIndex = '200';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.zIndex = '100';
              }}
              >
                🚀
              </div>
            </div>
          </>
        )}

        {/* END Location Marker - Show when searchTerm is confirmed (after Enter) */}
        {matchedLocation && searchTerm && (
          <>
            {/* END Highlight Circle/Boundary */}
            <div
              style={{
                position: 'absolute',
                left: `${latLngToPixel(matchedLocation.lat, matchedLocation.lng).x}px`,
                top: `${latLngToPixel(matchedLocation.lat, matchedLocation.lng).y}px`,
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '4px solid #d90429',
                backgroundColor: 'rgba(217, 4, 41, 0.1)',
                zIndex: 50,
                transform: 'translate(-50%, -50%)',
                animation: 'pulse 2s infinite',
                pointerEvents: 'none'
              }}
            />

            {/* The END Marker */}
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
                console.log('🎯 END MARKER CLICKED:', matchedLocation.name);
                
                if (onMarkerClick) {
                  onMarkerClick(matchedLocation, deleteMarker);
                } else {
                  console.error('🎯 onMarkerClick function is missing!');
                }
              }}
              title={`END: ${matchedLocation.name}`}
            >
              {/* Enhanced END Marker Design */}
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#d90429',
                borderRadius: '50%',
                border: '4px solid white',
                boxShadow: '0 4px 12px rgba(217, 4, 41, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                animation: 'bounce 0.6s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2)';
                e.currentTarget.style.zIndex = '200';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.zIndex = '100';
              }}
              >
                🎯
              </div>
            </div>
          </>
        )}

        {/* No Search Message */}
        {(!searchTerm || searchTerm.trim() === '') && (
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
            🔍 Type exact location name and press Enter
          </div>
        )}

        {/* No Match Message */}
        {searchTerm && searchTerm.trim() !== '' && !matchedLocation && (
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(220, 38, 27, 0.9)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '14px',
            zIndex: 200,
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            ❌ No exact match for "{searchTerm}"
          </div>
        )}
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

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default MapView;