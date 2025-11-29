const incomeSummary = {
  currentMonth: 5400,
  previous30Days: 4800,
  changePercent: 12.5,
};

const payouts = [
  { id: "1", amount: 1750, van: "Modest Explorer", date: "2024-09-12" },
  { id: "2", amount: 2050, van: "Beach Bum", date: "2024-09-07" },
  { id: "3", amount: 1600, van: "Green Wonder", date: "2024-08-30" },
];

export default function HostVanIncome() {
  return (
    <section className="host-income">
      <header className="host-income-header">
        <div>
          <p className="host-income-label">Income (last 30 days)</p>
          <h1>${incomeSummary.currentMonth.toLocaleString()}</h1>
        </div>
        <p className="host-income-change">
          <span className="host-income-chip positive">
            +{incomeSummary.changePercent}%
          </span>{" "}
          vs previous period (${incomeSummary.previous30Days.toLocaleString()})
        </p>
      </header>

      <div className="host-income-chart-placeholder">
        <p>Chart coming soon</p>
      </div>

      <section className="host-income-payouts">
        <div className="host-income-payouts-header">
          <h3>Your payouts</h3>
          <p>Last {payouts.length} payments</p>
        </div>
        <ul className="host-income-payouts-list">
          {payouts.map((payout) => (
            <li key={payout.id} className="host-income-payout">
              <div>
                <strong>${payout.amount.toLocaleString()}</strong>
                <p>{payout.van}</p>
              </div>
              <span>
                {new Date(payout.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
