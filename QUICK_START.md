# Quick Start Guide

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 🎨 New Features Overview

### 1. Landing Page

- Click "Log in" button to see the animated loading screen
- Watch the connecting animation with spinner
- Smooth transition to dashboard

### 2. Collapsible Sidebar

- Look for the small circular button on the right edge of the sidebar
- Click to collapse/expand the sidebar
- Icons remain visible when collapsed
- Hover over icons for tooltips when collapsed

### 3. Invoice Dashboard

- **Filter Dropdown:** Use the filter dropdown to sort invoices
  - "All Invoices" - Default view
  - "Sort by Vendor" - Alphabetically by vendor name
  - "Sort by Due Date" - Chronologically by due date
- **Color-Coded Status:**
  - Blue icons - Unpaid invoices
  - Green icons - Paid invoices
- **Statistics Cards:** View summary at the bottom
- Click "Pay Now" to open payment modal

### 4. Payment Modal

- Select wallet, stable coin, and network
- Watch the processing animation
- See success/error animations

### 5. Account Page

- Edit your information in the left form
- View current info in the right panel
- See success toast when saving

### 6. Settings Page

- Switch between tabs: Wallets, Networks, Stable Coins
- Configure your payment preferences
- Save to see confirmation toast

### 7. Logout

- Red logout button at the bottom of the sidebar
- Hover to see the rotation animation
- Returns you to landing page

## 🎯 Key Interactions to Try

1. **Collapse the sidebar** and navigate between pages
2. **Filter invoices** by vendor and due date
3. **Pay an invoice** to see the full payment flow
4. **Update your account** information
5. **Configure settings** in different tabs
6. Watch all the **smooth animations** throughout

## 📝 Notes

- All changes are saved immediately (simulated with 800ms delay)
- Success/error states are visible with toast notifications
- All interactions provide visual feedback
- The app is fully responsive

## 🎨 Visual Highlights

- Gradient backgrounds throughout
- Smooth transitions and animations
- Color-coded status indicators
- Interactive hover effects
- Loading states for all async actions
- Beautiful success/error modals

Enjoy exploring the enhanced UI! 🎉
