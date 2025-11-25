# Quick Deploy Instructions

## 1. Get GA4 Property ID
- Go to Google Analytics → Admin → Property Settings
- Copy Property ID (e.g., 123456789)

## 2. Create Service Account
- Go to Google Cloud Console
- Enable Analytics Data API
- Create Service Account
- Download JSON key
- Add service account email to GA4 (Viewer role)

## 3. Deploy to Vercel
```bash
npm i -g vercel
vercel
```

## 4. Add Environment Variables in Vercel Dashboard
- GA4_PROPERTY_ID=your_property_id
- GOOGLE_PROJECT_ID=from_json_file
- GOOGLE_PRIVATE_KEY=from_json_file
- GOOGLE_CLIENT_EMAIL=from_json_file

## 5. Test
Visit: https://your-app.vercel.app/api/analytics

Your analytics will now show real GA4 data!