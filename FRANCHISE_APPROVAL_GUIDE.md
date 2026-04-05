# Franchise Application & Approval System
## Option 1: EmailJS + LocalStorage Setup

---

## 📋 System Overview

This implementation provides a **complete franchise application workflow** without backend:

```
User Applies → Email Sent → Admin Reviews → Admin Approves → User Gets Access
```

---

## 🔄 Complete Workflow

### Step 1: User Applies for Franchise
1. User goes to `/franchise` page
2. Clicks "Apply Now to Join" button
3. Fills out form:
   - Full Name
   - **Email Address** (NEW!)
   - Phone Number
   - City & State
   - Budget Range
4. Clicks "Submit"

### Step 2: Email Notification (EmailJS)
- **Email sent to admin**: `thedarvin93@gmail.com`
- Contains: Applicant name, phone, city, budget, email
- Includes link to approval panel
- Confirmation email sent to applicant (optional)

### Step 3: Application Stored
- Application saved in **localStorage** under `franchise_applications`
- User status changed to **"pending"**
- Cannot access dashboard until approved

### Step 4: Admin Reviews Applications
1. Admin visits: `http://localhost:5173/#/admin/approvals`
2. See all pending applications with stats
3. Filter by status: Pending, Approved, Rejected, All
4. Click application to expand details

### Step 5: Admin Approves/Rejects
- **Approve Button**: 
  - User status changed to "approved"
  - User role changed to "farmer"
  - User can now login and access `/dashboard`
  
- **Reject Button**:
  - Application marked as rejected
  - User status reset to "none"
  - User can reapply

---

## 📁 Files Created/Modified

### New Files:
1. **`src/utils/emailService.js`**
   - EmailJS configuration
   - Send franchise application emails
   - Send confirmation emails

2. **`src/pages/AdminApprovals.jsx`**
   - Admin panel to review applications
   - Approve/Reject functionality
   - Filter and search applications
   - View applicant details

3. **`.env.example`**
   - EmailJS configuration template

4. **`.env.local`**
   - Local environment variables (demo values)

### Modified Files:
1. **`src/auth/AuthContext.jsx`**
   - Added `submitFranchiseApp()` - Store applications in localStorage
   - Added `getPendingApplications()` - Get all pending apps
   - Added `approveApplication()` - Admin approve function
   - Added `rejectApplication()` - Admin reject function
   - Updated context provider to export new functions

2. **`src/pages/FranchisePage.jsx`**
   - Imported emailService
   - Added email field to form
   - Updated `handleApplySubmit()` to send emails
   - Added loading state during submission
   - Enhanced success message

3. **`src/App.jsx`**
   - Added route: `<Route path="/admin/approvals" element={<AdminApprovals />} />`
   - Imported AdminApprovals component

---

## 🔧 EmailJS Setup (Optional - For Real Emails)

If you want to send **real emails** to `thedarvin93@gmail.com`:

### Create EmailJS Account:
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for free account
3. Create new service (Gmail, Outlook, etc.)
4. Create email templates
5. Get credentials:
   - **Public Key** → `VITE_EMAILJS_PUBLIC_KEY`
   - **Service ID** → `VITE_EMAILJS_SERVICE_ID`
   - **Template ID** → `VITE_EMAILJS_TEMPLATE_ID`

### Update `.env.local`:
```
VITE_EMAILJS_PUBLIC_KEY=your_your_public_key
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx
VITE_EMAILJS_CONFIRMATION_TEMPLATE=template_xxxxxxxxx
```

### Without Setup:
- Currently using demo values
- Application still stores in localStorage
- Admin panel still works
- Just won't send real emails (that's fine for testing!)

---

## 🎯 How to Test

### Test as Farmer:
1. **Step 1**: Go to `http://localhost:5173/#/franchise`
2. **Step 2**: Fill form and submit → See "Application Submitted" message
3. **Step 3**: Try to access `/dashboard` → Get "Access Denied" (as expected)

### Test as Admin:
1. **Step 1**: Go to `http://localhost:5173/#/admin/approvals`
2. **Step 2**: See the farmer's pending application
3. **Step 3**: Click "Approve" button
4. **Step 4**: Now farmer can login and access `/dashboard` ✅

### Test Full Workflow:
```
1. Signup as: test@example.com / password123
2. Go to /franchise
3. Apply for franchise
4. Check /admin/approvals (see pending application)
5. Approve the application
6. Logout
7. Login as: test@example.com / password123
8. Now can access /dashboard! ✅
```

---

## 💾 Data Storage (No Backend!)

All data stored in **browser's localStorage**:

### Database 1: `users_db`
```json
{
  "email": "farmer@demo.com",
  "password": "123456",
  "role": "farmer",
  "status": "approved",
  "name": "Demo Farmer"
}
```

### Database 2: `franchise_applications`
```json
{
  "id": 1712345678,
  "email": "farmer@demo.com",
  "name": "John Doe",
  "phone": "+91 98765 43210",
  "city": "Bangalore, Karnataka",
  "budget": "5",
  "submittedAt": "2024-04-05T12:30:00Z",
  "status": "pending",
  "approvedAt": null
}
```

---

## 🔒 Security Notes

⚠️ **This is demo/prototype only!**

For production, you would need:
- Real backend server
- Secure password hashing
- Email verification
- Admin authentication
- Database (MongoDB, PostgreSQL, etc.)
- HTTPS/SSL

---

## 📊 Admin Panel Features

### View All Applications
- See applicant name, email, phone, city, budget
- Submission date and time
- Current approval status

### Filter & Search
- Pending Applications (needs action)
- Approved Farmers (have access)
- Rejected Applications (can reapply)
- All Applications (complete history)

### Statistics
- Count of pending applications
- Count of approved farmers
- Count of rejected applications

### Actions
- 🟢 **Approve** → Grant dashboard access
- 🔴 **Reject** → Deny franchise, can reapply
- 📋 **View Details** → Expand full application

---

## 🚀 Future Enhancements

1. **Email Verification**
   - User clicks email link to confirm
   - Auto-approve if verified

2. **Payment Integration**
   - Razorpay/Stripe for franchise fee
   - Auto-approve after payment

3. **PDF Reports**
   - Export application as PDF
   - Send via email to admin

4. **Bulk Actions**
   - Approve multiple applications
   - Export all applications

5. **Real Backend**
   - Move from localStorage to database
   - Add authentication
   - Add audit logs

---

## 📱 User Experience Flow (Visual)

```
🌍 Home Page
    ↓
📋 Franchise Page (/franchise)
    ↓
📝 Fill Application Form
    ↓
📧 Submit → Email sent to admin + App saved
    ↓
⏳ Show "Application Under Review"
    ↓
❌ Try /dashboard? → "Access Denied"
    ↓
🔐 Admin goes to /admin/approvals
    ↓
✅ Admin clicks "Approve"
    ↓
✔️ User status changed to "approved"
    ↓
🚀 User logins, accesses /dashboard!
```

---

## 📞 Support

### For Test/Demo:
- Use demo credentials in `/pages/FranchisePage.jsx`
- Test email sending (or check browser console)
- Check localStorage in DevTools → Application → Local Storage

### Troubleshooting:
1. **Email not sending?** → Check .env.local values
2. **Admin panel not showing apps?** → Check localStorage `franchise_applications`
3. **Can't access dashboard after approval?** → Logout/Login again
4. **Lost data?** → Clear browser cache/localStorage

---

## ✅ Implementation Checklist

- ✅ EmailJS integration
- ✅ Email field in application form
- ✅ Email sending on submit
- ✅ Application storage in localStorage
- ✅ Admin approval panel
- ✅ Approve/Reject functionality
- ✅ Role update on approval
- ✅ Dashboard access after approval
- ✅ Route added to App.jsx
- ✅ User status management
- ✅ Filter and search
- ✅ Responsive UI

**Everything is ready to test! 🎉**

---

## 🎓 Key Concept: No Backend Needed

```
Traditional: User Apply → Backend Email → Backend DB → Backend Auth → Dashboard
Our System: User Apply → Frontend Email → localStorage → Frontend Auth → Dashboard
```

Perfect for prototyping and MVP testing!
