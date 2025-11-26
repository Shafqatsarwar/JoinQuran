'use client';

import { useState, useEffect } from 'react';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

import TestimonialsCarousel from '@/components/TestimonialsCarousel';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage('Review submitted successfully! 🎉');
        setFormData({ name: '', rating: 5, comment: '' });
        fetchReviews(); // Refresh list
      } else {
        setMessage('Failed to submit review. Please try again.');
      }
    } catch {
      setMessage('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 text-dark-text">
      <h1 className="text-4xl font-bold text-center text-primary mb-4">Student Reviews ⭐</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        See what our students and parents have to say about their learning journey with JoinQuran.
      </p>

      {/* Featured Reviews Carousel */}
      <TestimonialsCarousel />

      <div className="my-16 border-t border-gray-200"></div>

      {/* Review Form */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mb-12 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Write a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className={`text-2xl transition-transform hover:scale-110 ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
            <textarea
              required
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all h-32"
              placeholder="Share your experience..."
            />
          </div>

          {message && <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
        {loading ? (
          <p className="text-center col-span-2 text-gray-500">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center col-span-2 text-gray-500">No reviews yet. Be the first to write one!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-800">{review.name}</h3>
                <span className="text-yellow-400 text-lg">{'★'.repeat(review.rating)}<span className="text-gray-200">{'★'.repeat(5 - review.rating)}</span></span>
              </div>
              <p className="text-gray-600 leading-relaxed">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-4">{new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
