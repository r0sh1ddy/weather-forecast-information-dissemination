import React from 'react';

const NewsUpdates = () => {
  // Define news updates manually with URLs
  const newsUpdates = [
    {
      title: "Heavy Rainfall Expected Across Kenya",
      description: "The Kenya Meteorological Department (KMD) forecasts continued rainfall until May 6th. This may lead to flooding in low-lying areas and landslides on saturated slopes.",
      link: "https://www.reuters.com/world/africa/kenyas-weather-outlook-dire-cyclone-nears-president-says-2024-05-03/", // Link to KMD website - Daily Forecast
    },
    {
      title: "Flood Warnings Issued for Several Regions",
      description: "Due to the heavy rains, the KMD warns of potential flooding in low-lying areas, flood plains, and urban areas with poor drainage. Stay informed and take necessary precautions.",
      link: "https://www.aljazeera.com/news/2024/5/3/kenya-floods-10/", // Link to KMD website - Advisories & Warnings
    },
    {
      title: "Potential Travel Disruptions Due to Heavy Rains",
      description: "Commuters are advised to be cautious on the roads as heavy rains may cause slippery conditions and flash floods. Allow extra travel time and check road closures before heading out.",
      link: "https://transport-links.com/news-and-events/transport-networks-in-east-africa-are-at-risk-from-severe-climate-events-hvt-project-finds", // Link to Kenya Highways Authority website (replace with actual link if available)
    },
    {
      title: "Landslide Risks Increase in Saturated Areas",
      description: "With continued rainfall, the risk of landslides increases in areas with saturated slopes. Residents in these areas should be vigilant and take precautions.",
      link: "https://www.disastermanagement.go.ke/", // Link to National Disaster Management Authority website
    },
    {
      title: "Stay Updated on Latest Weather Forecasts",
      description: "For the most recent weather updates and warnings, visit the Kenya Meteorological Department website or download their mobile app.",
      link: "https://www.meteo.go.ke/", // Link to KMD website
    },
    {
      title: "Conservation Efforts Impacted by Heavy Rains",
      description: "Heavy rainfall may affect wildlife movement and access to resources in some conservation areas. Visitors are advised to check with park authorities before visiting.",
      link: "https://www.kws.go.ke/ (Kenya Wildlife Service)", // Link to Kenya Wildlife Service website (replace with actual link if available)
    },
    {
      title: "Potential Impact on Agriculture and Food Security",
      description: "While some regions may benefit from the increased rainfall, heavy rains can also damage crops and disrupt agricultural activities. Monitor updates on potential food security concerns.",
      link: "https://www.agriculture.go.ke/ (Ministry of Agriculture, Livestock, Fisheries and Cooperatives)", // Link to Ministry of Agriculture website (replace with actual link if available)
    },
    {
      title: "Community Response and Support Initiatives",
      description: "Many communities in Kenya are coming together to respond to the challenges posed by the heavy rains. Learn more about these initiatives and how you can support them.",
      link: "https://saidika.co.ke/", // (replace with actual link if available)
    },
  ];

  return (
    <div style={{ width: '100%', textAlign: 'center',backgroundColor: '#3ea04b', minHeight: '100vh' }}>
      {newsUpdates.map((update, index) => (
        <div key={index} style={styles.container}>
          <h2 style={styles.title}>{update.title}</h2>
          <p style={styles.description}>{update.description}</p>
          <a href={update.link} style={styles.link} target="_blank" rel="noopener noreferrer">Learn more</a>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: '70%',
    margin: 'auto',
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#b5d1f0',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  description: {
    fontSize: '20px',
    marginBottom: '15px',
    color: '#353232',
  },
  link: {
    display: 'block',
    fontSize: '18px',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default NewsUpdates;
