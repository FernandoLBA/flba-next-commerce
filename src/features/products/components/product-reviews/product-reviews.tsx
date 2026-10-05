import { appMessages } from "@/shared/constants/app.messages";
import { ProductReview } from "../../types/product.types";
import { ProductStars } from "../product-stars/product-stars";

type ProductReviewsProps = {
  reviews: ProductReview[];
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const ProductReviews = ({ reviews }: ProductReviewsProps) => (
  <section
    aria-labelledby="product-reviews-title"
    className="flex flex-col gap-4"
  >
    <h2 id="product-reviews-title" className="typo-subtitle">
      {appMessages.PRODUCT_DETAIL.REVIEWS} ({reviews.length})
    </h2>

    {reviews.length === 0 ? (
      <p className="typo-body text-muted">
        {appMessages.PRODUCT_DETAIL.NO_REVIEWS}
      </p>
    ) : (
      <ul className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <li
            key={crypto.randomUUID()}
            className="flex flex-col gap-2 rounded-md border border-border p-4"
          >
            <div className="flex-x-between">
              <p className="typo-heading">{review.reviewerName}</p>
              <ProductStars value={review.rating} />
            </div>

            <p className="typo-body-sm">{review.comment}</p>

            <p className="typo-caption text-muted">{formatDate(review.date)}</p>
          </li>
        ))}
      </ul>
    )}
  </section>
);
