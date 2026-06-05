import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockBookings, mockRevenueData } from "../data/mockData";
import { useToast } from "../context/ToastContext";

export default function CommissionPage() {
  const showToast = useToast();
  const [rate, setRate]         = useState(10);
  const [draftRate, setDraft]   = useState(10);
  const [editMode, setEditMode] = useState(false);
  const [history, setHistory]   = useState([
    { date: "2024-01-01", rate: 8,  changedBy: "admin@rentnest.com", reason: "Initial rate" },
    { date: "2024-03-15", rate: 9,  changedBy: "admin@rentnest.com", reason: "Revised after Q1 review" },
    { date: "2024-05-01", rate: 10, changedBy: "admin@rentnest.com", reason: "Aligned with industry standard" },
  ]);

  const totalRevenue    = mockBookings.reduce((s, b) => s + b.amount, 0);
  const totalCommission = (totalRevenue * rate / 100).toFixed(2);
  const avgPerBooking   = (totalRevenue * rate / 100 / mockBookings.length).toFixed(2);

  const chartData = mockRevenueData.map(d => ({
    month: d.month,
    commission: +(d.revenue * rate / 100).toFixed(2),
    revenue: d.revenue,
  }));

  function saveRate(reason) {
    setRate(draftRate);
    setHistory(prev => [...prev, {
      date: new Date().toISOString().split("T")[0],
      rate: draftRate,
      changedBy: "admin@rentnest.com",
      reason: reason || "Manual update",
    }]);
    setEditMode(false);
    showToast(`Commission rate updated to ${draftRate}%`);
  }

  return (
    <>
      {/* Current rate hero */}
      <div className="commission-display">
        <div>
          <div style={{ fontSize: 12, fontWeight: "bold", letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>
            Current Commission Rate
          </div>
          <div className="commission-rate-big">{rate}%</div>
        </div>
        <div style={{ width: 1, height: 80, background: "rgba(255,255,255,0.2)" }} />
        <div className="commission-info">
          <h3>Platform Earnings Rate</h3>
          <p>
            RentNest earns <strong>{rate}%</strong> of every completed rental booking.<br />
            This applies automatically to all transactions on the platform.
          </p>
          {!editMode && (
            <button
              className="btn-primary"
              style={{ marginTop: 14 }}
              onClick={() => { setDraft(rate); setEditMode(true); }}
            >
              ✏️ Update Rate
            </button>
          )}
        </div>
      </div>

      {/* Edit panel */}
      {editMode && <RateEditor draftRate={draftRate} setDraft={setDraft} onSave={saveRate} onCancel={() => setEditMode(false)} />}

      {/* Earning summary */}
      <div className="commission-earnings-grid">
        <div className="earning-card">
          <div className="earning-label">Total Rental Volume</div>
          <div className="earning-value">${totalRevenue}</div>
        </div>
        <div className="earning-card">
          <div className="earning-label">Total Commission Earned</div>
          <div className="earning-value" style={{ color: "#52796f" }}>${totalCommission}</div>
        </div>
        <div className="earning-card">
          <div className="earning-label">Avg per Booking</div>
          <div className="earning-value">${avgPerBooking}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="section-card">
        <div className="section-header">
          <div>
            <div className="section-title">Commission Earnings Trend</div>
            <div className="section-sub">Monthly earnings at {rate}% rate</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="commGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#84a98c" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#84a98c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#edf7f7" />
            <XAxis dataKey="month" tick={{ fontSize: 13, fill: "#52796f" }} />
            <YAxis tick={{ fontSize: 13, fill: "#52796f" }} />
            <Tooltip
              contentStyle={{ borderRadius: 10, border: "1px solid #d0e8e8", fontFamily: "Arial" }}
              formatter={(v) => [`$${v}`, "Commission"]}
            />
            <Area type="monotone" dataKey="commission" stroke="#84a98c" strokeWidth={2.5}
              fill="url(#commGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Booking breakdown */}
      <div className="section-card">
        <div className="section-header">
          <div className="section-title">Booking Commission Breakdown</div>
          <div className="section-sub" style={{ color: "#84a98c", fontWeight: "bold" }}>Rate: {rate}%</div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Booking</th>
              <th>Buyer</th>
              <th>Rental Amount</th>
              <th>Commission ({rate}%)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {mockBookings.map(b => (
              <tr key={b.id}>
                <td><strong>{b.item}</strong></td>
                <td>{b.buyer}</td>
                <td>${b.amount}</td>
                <td>
                  <strong style={{ color: "#52796f" }}>
                    ${(b.amount * rate / 100).toFixed(2)}
                  </strong>
                </td>
                <td>{b.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rate history */}
      <div className="section-card">
        <div className="section-header">
          <div className="section-title">Commission Rate History</div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Date Changed</th>
              <th>Rate</th>
              <th>Changed By</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {[...history].reverse().map((h, i) => (
              <tr key={i}>
                <td>{h.date}</td>
                <td>
                  <span className="badge badge-active">{h.rate}%</span>
                </td>
                <td>{h.changedBy}</td>
                <td style={{ color: "#52796f" }}>{h.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function RateEditor({ draftRate, setDraft, onSave, onCancel }) {
  const [reason, setReason] = useState("");

  return (
    <div className="section-card" style={{ border: "2px solid #84a98c", marginBottom: 28 }}>
      <div className="section-header">
        <div className="section-title">✏️ Update Commission Rate</div>
        <button className="btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
        <div>
          <div className="form-label" style={{ marginBottom: 16 }}>
            New Rate: <strong style={{ fontSize: 24, color: "#2f3e46" }}>{draftRate}%</strong>
          </div>
          <input
            type="range"
            min="1" max="30" step="0.5"
            value={draftRate}
            onChange={e => setDraft(+e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#84a98c", marginTop: 6 }}>
            <span>1%</span><span>15%</span><span>30%</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            {[5, 8, 10, 12, 15, 20].map(p => (
              <button
                key={p}
                className={draftRate === p ? "btn-primary btn-sm" : "btn-secondary btn-sm"}
                onClick={() => setDraft(p)}
              >{p}%</button>
            ))}
          </div>
        </div>

        <div>
          <div className="form-group">
            <label className="form-label">Reason for Change</label>
            <textarea
              className="form-textarea"
              placeholder="Describe why you are updating the commission rate..."
              value={reason}
              onChange={e => setReason(e.target.value)}
              style={{ minHeight: 80 }}
            />
          </div>
          <button className="btn-primary" onClick={() => onSave(reason)}>
            Save New Rate ({draftRate}%)
          </button>
        </div>
      </div>
    </div>
  );
}
