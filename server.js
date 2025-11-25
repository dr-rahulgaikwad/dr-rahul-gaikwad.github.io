const express = require('express');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for your domain
app.use(cors({
  origin: ['https://dr-rahulgaikwad.com', 'http://localhost:3000', 'https://dr-rahul-gaikwad.github.io']
}));

// Initialize GA4 client
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS || './ga4-service-account.json'
});

// Your GA4 Property ID (replace with your actual property ID)
const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || 'YOUR_GA4_PROPERTY_ID';

app.get('/api/analytics', async (req, res) => {
  try {
    // Fetch visitor data (last 30 days)
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${GA4_PROPERTY_ID}`,
      dateRanges: [
        { startDate: '30daysAgo', endDate: 'today' }
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' }
      ],
      dimensions: [
        { name: 'country' }
      ]
    });

    // Calculate totals
    let totalVisitors = 0;
    let totalPageViews = 0;
    const countries = new Set();

    response.rows.forEach(row => {
      totalVisitors += parseInt(row.metricValues[0].value || 0);
      totalPageViews += parseInt(row.metricValues[1].value || 0);
      countries.add(row.dimensionValues[0].value);
    });

    // Get top countries for the chart
    const countryData = response.rows
      .map(row => ({
        country: row.dimensionValues[0].value,
        visitors: parseInt(row.metricValues[0].value || 0)
      }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 5);

    res.json({
      visitors: totalVisitors,
      pageViews: totalPageViews,
      countries: countries.size,
      topCountries: countryData,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('GA4 API Error:', error);
    
    // Fallback data if API fails
    res.json({
      visitors: 18750 + Math.floor(Math.random() * 1000),
      pageViews: 32400 + Math.floor(Math.random() * 2000),
      countries: 52,
      topCountries: [
        { country: 'India', visitors: 8437 },
        { country: 'United States', visitors: 4687 },
        { country: 'United Kingdom', visitors: 2812 },
        { country: 'Germany', visitors: 1125 },
        { country: 'Canada', visitors: 937 }
      ],
      lastUpdated: new Date().toISOString(),
      fallback: true
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Analytics API server running on port ${PORT}`);
});