import React from "react";

const dashboardStats = [
  { label: "Total income (30d)", value: "$5,400" },
  { label: "Vans listed", value: "3" },
  { label: "Average rating", value: "4.9/5" },
];

const upcomingTrips = [
  {
    id: "trip-1",
    van: "Modest Explorer",
    guest: "Alex R.",
    startDate: "2024-09-20",
    nights: 5,
  },
  {
    id: "trip-2",
    van: "Beach Bum",
    guest: "Nora D.",
    startDate: "2024-09-18",
    nights: 3,
  },
  {
    id: "trip-3",
    van: "Green Wonder",
    guest: "Sam P.",
    startDate: "2024-09-14",
    nights: 7,
  },
];

export default function Dashboard() {
  return (
    <section className="host-dashboard">
      <header className="host-dashboard-header">
        <div>
          <p className="host-dashboard-subtitle">Dashboard</p>
          <h1>Welcome back!</h1>
        </div>
        <button className="link-button">Create new listing</button>
      </header>

      <div className="host-dashboard-stats">
        {dashboardStats.map((stat) => (
          <div key={stat.label} className="host-dashboard-stat">
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </div>

      <section className="host-dashboard-trips">
        <div className="host-dashboard-trips-header">
          <h2>Upcoming trips</h2>
          <p>{upcomingTrips.length} reservations this week</p>
        </div>
        <ul>
          {upcomingTrips.map((trip) => (
            <li key={trip.id} className="host-dashboard-trip">
              <div>
                <strong>{trip.van}</strong>
                <p>
                  Guest: {trip.guest} · {trip.nights} nights
                </p>
              </div>
              <span>
                {new Date(trip.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="host-dashboard-tips">
        <h2>Quick tips</h2>
        <ul>
          <li>Update your listing photos to boost conversions.</li>
          <li>Respond to new inquiries within 1 hour for better rankings.</li>
          <li>Offer a weekend discount to fill late September dates.</li>
        </ul>
      </section>
    </section>
  );
}
