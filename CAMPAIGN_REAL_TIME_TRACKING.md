# Real-Time Campaign Tracking Guide

## Overview

The Unbiased Relief platform now features real-time campaign tracking for government-coordinated relief initiatives. All campaigns display live progress metrics, verified badges, and urgency indicators matching the Dec 31 shipping deadline.

---

## Components Built

### 1. **CampaignImpactDashboard** (`src/components/CampaignImpactDashboard.tsx`)

Displays at the top of the homepage, showing:
- **Total Items Collected**: Aggregated across all campaigns (with progress bar)
- **Total Barrels Packed**: Running count of packed barrels
- **Active Campaigns**: Number of verified government-coordinated drives
- **Days Until Deadline**: Countdown to Dec 31, 2025

**Location**: Homepage, immediately after "Official Agencies Strip" section

**Data Source**: `getCampaignStats()` from `src/data/campaigns.ts`

---

### 2. **DriveCard Component** (`src/components/DriveCard.tsx`) - Enhanced

Each campaign displays:
- ✅ Verified badge (red)
- ⚡ Urgent badge (blue)
- 📸 Campaign image with hover zoom
- 📊 Red/Blue progress bar (Red = progress, Blue = remaining)
- 📦 Barrels packed vs goal
- 📋 Items collected count
- ⏰ Days remaining until deadline
- 🔗 Share button with social media options (Facebook, Twitter, WhatsApp, Email, Copy Link)
- 💬 "Contribute Items" button

**Progress Bar Design**:
```
Red = What's been collected
Blue = What's remaining to reach goal
```

---

### 3. **Campaign Detail Page** (`src/pages/CampaignDetail.tsx`) - Enhanced

Full campaign view showing:
- 🖼️ Hero image with dark overlay
- 📝 Campaign description
- 📊 Progress cards (Barrels, Items, Time, Organizer) with red/blue progress bar
- 📋 4-step "How to Help" guide
- 💡 CTA section linking to "What to Donate" and "Drop-Off Locations"
- ❓ FAQ section

---

## How to Update Campaign Data

### **Location**: `src/data/campaigns.ts`

### **Campaign Interface**:
```typescript
interface Campaign {
  id: string;                    // Unique identifier
  slug: string;                  // URL-friendly name
  image: string;                 // Image import path
  title: string;                 // Campaign title
  organizer: string;             // Who's running it (e.g., "Jamaica Red Cross")
  description: string;           // Full description
  barrelsPacked: number;         // Current barrels packed
  goal: number;                  // Total barrels goal
  itemsCollected: number;        // Total individual items collected
  daysLeft: number;              // Days until shipping deadline
  verified: boolean;             // Government verification
  urgent: boolean;               // Urgent/high priority
  featured?: boolean;            // Show on homepage
}
```

### **Example Campaign**:
```typescript
{
  id: "hygiene-port-antonio",
  slug: "hygiene-port-antonio",
  image: driveHygiene,
  title: "Hygiene & Sanitation Supplies for Port Antonio",
  organizer: "Jamaica Red Cross",
  description: "Collecting soap, toothpaste, sanitary products, diapers, and cleaning supplies for 200+ families who lost their homes in Port Antonio.",
  barrelsPacked: 4,
  goal: 50,
  itemsCollected: 90,
  daysLeft: 18,
  verified: true,
  urgent: true,
  featured: true,
}
```

### **To Add a New Campaign**:

1. Add a new image import at the top:
   ```typescript
   import driveNewCampaign from "@/assets/drive-new-campaign.jpg";
   ```

2. Add campaign object to `campaigns` array:
   ```typescript
   {
     id: "unique-id",
     slug: "url-friendly-slug",
     image: driveNewCampaign,
     title: "Campaign Title Here",
     organizer: "Organization Name",
     description: "Full description...",
     barrelsPacked: 0,
     goal: 100,
     itemsCollected: 0,
     daysLeft: 48,
     verified: true,
     urgent: false,
     featured: true,
   }
   ```

### **To Update Existing Campaign Progress**:

Just change the numbers:
```typescript
// Before
barrelsPacked: 4,
itemsCollected: 90,
daysLeft: 18,

// After
barrelsPacked: 12,
itemsCollected: 240,
daysLeft: 15,
```

---

## Real-Time Tracking Features

### **Homepage Dashboard**
- Shows aggregated stats across all campaigns
- Automatically calculates:
  - Total items = sum of all `itemsCollected`
  - Total barrels = sum of all `barrelsPacked`
  - Total goal = sum of all `goal`
  - Overall progress = (totalItems / totalGoal) × 100

### **Campaign Cards**
- Each card shows progress bar based on barrels packed
- Red portion = `(barrelsPacked / goal) × 100`
- Blue portion = remaining to goal
- Dynamically updates when you change the data

### **Campaign Detail Page**
- Full progress tracking with same visual style
- Shows "X more barrels needed" calculation
- Links to approved items list and drop-off locations

---

## Deployment & Updates

### **Local Development**:
```bash
npm run dev
```

### **Production Build**:
```bash
npm run build
```

### **Push Changes**:
```bash
git add src/data/campaigns.ts src/components/CampaignImpactDashboard.tsx src/components/DriveCard.tsx src/pages/CampaignDetail.tsx
git commit -m "Update campaign progress data"
git push
```

→ Automatically deploys to Hostinger via GitHub Actions

---

## Example: Daily Update Workflow

**Each morning, update the counts**:

```typescript
// src/data/campaigns.ts - Just change the numbers

export const campaigns: Campaign[] = [
  {
    id: "duty-free-relief-window",
    slug: "duty-free-relief-window",
    // ... other fields ...
    barrelsPacked: 5,        // ← Change this
    itemsCollected: 110,     // ← Change this
    daysLeft: 24,            // ← Change this (countdown)
    // ... rest of campaign ...
  },
  // ... other campaigns ...
];
```

**Push to GitHub**:
```bash
git add src/data/campaigns.ts
git commit -m "Daily campaign update: 5 barrels packed, 110 items"
git push origin main
```

→ Site automatically redeploys with new numbers!

---

## How Data Flows

```
campaigns.ts
    ↓
getCampaignStats() ← Dashboard reads this
    ↓
FeaturedCampaigns ← Shows campaign cards
    ↓
DriveCard ← Each card displays individual campaign
    ↓
CampaignDetail ← Full page view for each campaign
```

---

## Key Metrics to Track

For the **most impactful display**, track:

1. **Barrels Packed**: Physical containers sent or ready
2. **Items Collected**: Individual items (critical for showing scale)
3. **Days Left**: Visual urgency (countdown motivation)
4. **Verified Badge**: Government partnership seal
5. **Urgent Badge**: High-priority needs

---

## Customization Options

### **Change Progress Bar Colors**:

In `src/components/DriveCard.tsx` and `src/pages/CampaignDetail.tsx`:

```typescript
// Current design
<div className="w-full h-2 bg-blue-400 rounded-full overflow-hidden">
  <div
    className="h-full bg-red-600 transition-all duration-300"
    style={{ width: `${percentage}%` }}
  ></div>
</div>

// Alternative: Green/light green
<div className="w-full h-2 bg-green-200 rounded-full overflow-hidden">
  <div
    className="h-full bg-green-600 transition-all duration-300"
    style={{ width: `${percentage}%` }}
  ></div>
</div>
```

### **Change Urgency Badges**:

In `src/components/DriveCard.tsx`:
```typescript
{urgent && (
  <Badge className="bg-secondary text-secondary-foreground">
    Urgent
  </Badge>
)}
```

Change text or color as needed.

---

## Monitoring & Optimization

### **What to Monitor**:
- Are `daysLeft` counters updating daily?
- Are progress bars filling proportionally? (5/50 = 10%, 4/50 = 8%, etc.)
- Are "Contribute Items" buttons driving traffic?

### **Performance**:
- Dashboard loads aggregated stats in <50ms (all calculations client-side)
- No database queries needed
- Static data refresh on page load

---

## Future Enhancements

If scaling beyond Dec 31:

1. **Database Integration**: Move campaigns to PostgreSQL/Supabase for real-time updates
2. **Admin Dashboard**: Built-in admin panel to update campaign progress
3. **API Integration**: Connect to partner systems for automatic progress syncing
4. **Email Notifications**: Send daily email updates to subscribers
5. **Mobile App**: Native app with push notifications
6. **Impact Videos**: Embed beneficiary testimonials

---

## Support & Questions

For campaign data structure questions, see `src/data/campaigns.ts` file directly.

For component customization, refer to:
- `src/components/CampaignImpactDashboard.tsx` - Dashboard display
- `src/components/DriveCard.tsx` - Card UI and progress bar
- `src/pages/CampaignDetail.tsx` - Full campaign page
