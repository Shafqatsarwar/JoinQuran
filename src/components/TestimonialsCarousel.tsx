'use client';

import { useState, useEffect } from 'react';

const testimonials = [
    {
        id: 1,
        name: "Sarah Khan",
        role: "Parent",
        content: "JoinQuran has been a blessing for our family. My kids love their teacher and look forward to their classes.",
        rating: 5,
    },
    {
        id: 2,
        name: "Ahmed Ali",
        role: "Student",
        content: "The interactive lessons make learning Tajweed so much easier. Highly recommended!",
        rating: 5,
    },
    {
        id: 3,
        name: "Fatima Z.",
        role: "Parent",
        content: "Flexible scheduling and excellent curriculum. Very satisfied with the progress.",
        rating: 5,
    }
];

const TestimonialsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl shadow-lg p-8">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                        <div className="flex flex-col items-center text-center">
                            <div className="text-yellow-400 text-2xl mb-4">
                                {'★'.repeat(testimonial.rating)}
                            </div>
                            <p className="text-xl text-gray-700 italic mb-6">"{testimonial.content}"</p>
                            <h3 className="font-bold text-lg text-teal-800">{testimonial.name}</h3>
                            <span className="text-sm text-gray-500">{testimonial.role}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6 gap-2">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-teal-600' : 'bg-teal-200'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestimonialsCarousel;
