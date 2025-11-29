const mockReviews = [
  {
    id: "1",
    author: "Seda Kaya",
    rating: 5,
    date: "2024-08-12",
    comment:
      "Amazing experience! The van was spotless and arrived right on time. I'll definitely rent again.",
  },
  {
    id: "2",
    author: "Mert Aydın",
    rating: 4,
    date: "2024-07-02",
    comment:
      "Looked exactly like the photos. We had a small AC issue but the team fixed it quickly.",
  },
  {
    id: "3",
    author: "Ece Karaca",
    rating: 5,
    date: "2024-05-27",
    comment:
      "Smooth ride and super cozy inside. The host replied instantly to every question. Highly recommend.",
  },
];

function StarRating({ value }: { value: number }) {
  return (
    <span className="review-rating">
      {"★".repeat(value)}
      {"☆".repeat(5 - value)}
    </span>
  );
}

export default function Reviews() {
  return (
    <section className="host-reviews">
      <div className="host-reviews-header">
        <h1>What your guests say</h1>
        <p className="host-reviews-summary">
          {mockReviews.length} reviews · Average 4.7/5
        </p>
      </div>

      <ul className="host-reviews-list">
        {mockReviews.map((review) => (
          <li key={review.id} className="host-review-card">
            <div className="host-review-meta">
              <strong>{review.author}</strong>
              <StarRating value={review.rating} />
              <span className="host-review-date">
                {new Date(review.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <p className="host-review-comment">{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
