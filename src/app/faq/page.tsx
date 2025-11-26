const FaqPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-dark-text">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Frequently Asked Questions ❓</h1>
        <p className="text-lg text-gray-600 mb-10">
          Have questions? We have answers! Download our comprehensive FAQ document to learn more about our courses, fees, and teaching methods.
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform transition-all hover:scale-105">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">JoinQuran FAQ Guide</h2>
          <p className="text-gray-500 mb-8">
            Everything you need to know about starting your Quran learning journey.
          </p>
          <a
            href="/JoinQuran_FAQ.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-primary to-teal-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-primary transition-all font-bold text-lg group"
          >
            <span>Download FAQ PDF</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
