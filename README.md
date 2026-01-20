# Admin Dashboard

A Admin Dashboard for managing application data, fees, and other administrative tasks. The dashboard provides an intuitive interface with modals, dynamic tables, and API integration using Axios.

# Features
1) Student Dashboard:
 View student profiles and details.
 Track student enrollment, status, and performance.
Add and Track student information.

2) Fee Dashboard:
View and manage fees for users.
Collect and track fee payments.
Dynamic tables to show fee records.
Sidebar Navigation: Easy access to different sections of the dashboard.
Modals & Forms: For CRUD operations and fee collection.
API Integration: Axios is used for RESTful API requests.
Routing: React Router for seamless navigation.

# Technologies Used
# Frontend: React.js, React Router, Axios, TailwindCSS / CSS
# Backend: Node.js, Express.js
# Database: MongoDB
# Other Tools: npm, dotenv

<pre>
# Project Structure
admin-dashboard/
├── backend/                 # Node.js + Express backend
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── controllers/         # Business logic
│   └── server.js            # Entry point
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components (Sidebar, Modals, Tables)
│   │   ├── pages/           # Dashboard pages (FeeDashboard, UserDashboard)
│   │   ├── services/        # Axios API services
│   │   └── App.js           # Main App component with routes
└── README.md
</pre>

# Future Enhancements
1) Role-based authentication (Admin, Staff, User)
2) Graphs and analytics for fees and users
3) Export reports (PDF/Excel)
4) Notifications and reminders for pending fees
