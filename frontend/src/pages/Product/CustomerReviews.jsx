import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";

const CustomerReviews = ({ reviews }) => {
  const { theme } = useTheme();
 

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-6">Customer Reviews</h2>
      {reviews && reviews?.length > 0 ? (
        <div className="space-y-4">
          {reviews?.slice(0, 5).map((review, idx) => (
            <div
              key={idx}
              className={`${theme.card} ${theme.border} rounded-lg p-4`}
            >
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={
                      index < review.rating
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }
                  />
                ))}
                <span className={`${theme.subtext} text-sm ml-2`}>
                  {review.rating} / 5
                </span>
              </div>
              <p className="text-sm">{review.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className={`${theme.subtext} text-sm`}>
          No reviews yet. Be the first to write one!
        </p>
      )}
    </div>
  );
};

export default CustomerReviews;
