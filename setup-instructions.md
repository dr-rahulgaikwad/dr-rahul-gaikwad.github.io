# GA4 Analytics Setup Instructions

## Step 1: Get GA4 Property ID
1. Go to [Google Analytics](https://analytics.google.com)
2. Select your property
3. Go to Admin → Property Settings
4. Copy the Property ID (format: 123456789)

## Step 2: Create Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google Analytics Data API
4. Go to IAM & Admin → Service Accounts
5. Create Service Account
6. Download JSON key file
7. Rename it to `ga4-service-account.json`

## Step 3: Add Service Account to GA4
1. In Google Analytics, go to Admin → Property Access Management
2. Click "+" → Add users
3. Enter service account email (from JSON file)
4. Select "Viewer" role
5. Click "Add"

## Step 4: Configure Environment
1. Copy `.env.example` to `.env`
2. Add your GA4 Property ID
3. Place service account JSON file in root directory

## Step 5: Install and Run
```bash
npm install
npm start
```

## Step 6: Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel dashboard
4. Upload service account JSON as file

## Step 7: Update Frontend
Replace the API URL in your frontend code with your deployed Vercel URL.