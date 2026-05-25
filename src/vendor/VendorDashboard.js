import React from "react";
import "./VendorDashboard.css";

function VendorDashboard() {
  const listings = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400",
      selected: true,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      selected: true,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=400",
      selected: false,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      selected: true,
    },
  ];

  return (
    <div className="vendor-dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-logo-placeholder"></div>
        <h1>RentNest</h1>
      </header>

      <main className="dashboard-body">
        <div className="seller-button-wrapper">
          <button className="seller-outline-btn">I’m a Seller</button>
        </div>

        <button className="discover-btn">
          Discover <br /> Listings
        </button>

        <h2 className="current-title">Current Listings</h2>

        <div className="listing-container">
          {listings.map((item) => (
            <div className="listing-card" key={item.id}>
              <div
                className={
                  item.selected ? "check-circle blue-check" : "check-circle orange-check"
                }
              >
                ✓
              </div>

              <img src={item.image} alt="listing item" />
            </div>
          ))}
        </div>

        <div className="dashboard-actions">
          <button>+ Add more</button>
          <button>Edit Items</button>
          <button>Delete</button>
          <button>Manage</button>
        </div>
      </main>
    </div>
  );
}

export default VendorDashboard;