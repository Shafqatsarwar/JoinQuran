'use client';

import { useState } from 'react';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'onlinequran50@gmail.com', // Target email
          subject: `New Contact Message from ${data.name}`,
          text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
          html: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <br/>
            <p><strong>Message:</strong></p>
            <p>${data.message}</p>
          `,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-golden mb-8">Contact Us 📧</h1>
      <div className="prose lg:prose-xl mx-auto text-center mb-12 text-text-muted">
        <p>
          You are welcome to send us suggestions, comments, feedback and complaints by filling this form or by sending us mail at
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-golden mb-4">Contact Information</h2>
          <div className="space-y-4 text-gray-700">
            <p><strong>Whatsapp:</strong> {process.env.NEXT_PUBLIC_WHATSAPP}</p>
            <p><strong>Phone Number UK:</strong> {process.env.NEXT_PUBLIC_PHONE_UK}</p>
            <p><strong>Phone Number Pakistan:</strong> {process.env.NEXT_PUBLIC_PHONE_PK}</p>
            <p><strong>Email:</strong> {process.env.NEXT_PUBLIC_EMAIL}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-golden mb-4">Send us a Message</h2>
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h3>
              <p className="text-gray-600">Thank you for contacting us. We will get back to you soon.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-golden hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:border-transparent"
                  placeholder="example@email.com"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-primary focus:border-transparent"
                  placeholder="Write your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-golden text-white font-bold py-3 px-4 rounded-md shadow-md hover:bg-golden-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
