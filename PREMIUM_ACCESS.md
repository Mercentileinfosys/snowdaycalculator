# Premium Access Key System

## Overview

The Snow Day Calculator includes a premium access key system that allows users to unlock premium features either through direct URL access or by manually entering their access key.

## How It Works

### For Users

1. **Direct URL Access** (Recommended)
   - After purchasing, users receive a direct link like: `https://yourdomain.com/premium?access=premium_snow_2025_abc123`
   - Clicking this link automatically activates premium access

2. **Manual Key Entry**
   - Users can visit the `/premium` page directly
   - Click "🔑 I already have an access key"
   - Enter their access key manually
   - Click "Activate Premium Access"

### Current Valid Keys (for testing)

```
premium_snow_2025_abc123
premium_snow_2025_def456
premium_snow_2025_ghi789
```

## Generating Access Keys

Use the included script to generate unique access keys:

```bash
# Generate a single access key
node scripts/generate-premium-links.js single customer@example.com

# Generate multiple keys
node scripts/generate-premium-links.js bulk 10

# Generate keys formatted for Gumroad
node scripts/generate-premium-links.js gumroad-format 5
```

## Gumroad Integration Setup

### Option 1: Manual Key Delivery
1. Generate access keys using the script above
2. After each Gumroad purchase, manually send the access key to customers via email
3. Include both the direct URL and manual entry instructions

### Option 2: Automated Redirect (Advanced)
1. Set up Gumroad success redirect URL to: `https://yourdomain.com/premium?access={ACCESS_KEY}`
2. Use Gumroad's webhook system to dynamically assign keys
3. Requires backend integration with Gumroad API

## Key Storage and Security

- Access keys are validated against a predefined list in the React component
- Keys are stored in `localStorage` once validated for persistent access
- In production, consider moving key validation to a backend service for better security

## Premium Features Unlocked

✅ Real-time weather data from WeatherAPI  
✅ Live snowfall and precipitation predictions  
✅ Professional temperature and wind analysis  
✅ City-specific calculations worldwide  
✅ AI-enhanced accuracy up to 95%  
✅24-hour forecast visualization  
✅ Automatic city memory for convenience  

## User Experience Flow

1. **No Access**: User sees purchase page with key input option
2. **Key Entry**: User can toggle access key input field
3. **Validation**: Real-time validation with error handling
4. **Success**: Immediate access to premium features
5. **Persistence**: Access is remembered for future visits

## Analytics Tracking

The system tracks:
- Premium page visits
- Manual key activation attempts (success/failure)
- Premium feature usage
- Calculation success rates

## Implementation Details

### Components Modified
- `Premium.js`: Added access key input UI and validation logic

### New State Variables
```javascript
const [enteredAccessKey, setEnteredAccessKey] = useState('');
const [keyInputError, setKeyInputError] = useState('');
const [showKeyInput, setShowKeyInput] = useState(false);
```

### Key Validation Function
```javascript
const handleAccessKeySubmit = () => {
  if (validAccessKeys.includes(enteredAccessKey.trim())) {
    // Activate premium access
    localStorage.setItem('snow-day-premium-access', enteredAccessKey.trim());
    setHasAccess(true);
  } else {
    // Show error
    setKeyInputError('Invalid access key...');
  }
};
```

## Future Enhancements

1. **Backend Validation**: Move key validation to a secure backend service
2. **Usage Analytics**: Track key usage patterns and popular features
3. **Dynamic Key Generation**: Generate keys on-demand through Gumroad webhooks
4. **Expiration Dates**: Add support for time-limited access keys
5. **Tiered Access**: Different key types for different feature sets

## Customer Support

When customers need help with access keys:
1. Verify the key format matches: `premium_snow_2025_xxxxxx`
2. Check if the key exists in your valid keys list
3. Guide them through the manual entry process
4. Provide both direct URL and manual entry options

## Security Considerations

- Keys are currently client-side validated (suitable for low-security needs)
- For production, consider server-side validation
- Implement rate limiting on key validation attempts
- Monitor for brute force attacks on key validation
- Consider key rotation for enhanced security
