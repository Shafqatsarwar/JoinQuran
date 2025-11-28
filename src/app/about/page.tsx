const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">About Us 🕌</h1>
      <div className="prose lg:prose-xl mx-auto text-gray-500">
        <p className="text-gray-400">
          Learning Quran Institute is one of the Leading Online Islamic Academy for those that want to learn Islam and Quran online by way of distance courses. We have developed an extensive curriculum for learning Quran and basic islamic education. Our distance courses utilize unique online learning tools, and combine both ancient and modern methods of teaching. Study Islam online through our innovative online Islamic classes and experience it for yourself.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-center text-green-600 mt-16 mb-8">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-8 text-gray-700">
        <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-100">
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">Our Services</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Quran Reading Education for Beginners</li>
            <li>Tajweed Classes for Advance learners</li>
            <li>Quran Translation</li>
            <li>Basic Islamic teachings</li>
            <li>Memorization of Holy Quran</li>
            <li>Urdu Learning Classes</li>
          </ul>
        </div>
        <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-100">
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">Our Tutors</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Hafiz-i-Quran (Have memorized whole Qu’ran)</li>
            <li>Well aware of rules of Recitation.</li>
            <li>University graduates in Islamic Studies</li>
            <li>Well trained to teach Quran online</li>
            <li>Excellent command on English, Arabic and Urdu</li>
            <li>Highly motivated and understand the complexities of the profession</li>
          </ul>
        </div>
        <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-100">
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">Training of Tutors</h3>
          <p className="text-gray-600">
            We train our tutors before allotting them students, as teaching online is a totally different technique as compare to conventional teaching. We keep on arranging different training programs/refresher courses for the tutors to keep them updated according to the need of time and to maintain the quality. Learning Quran Institute is non-partisan group of teachers, we are not part of any group, Islamic organization or mosques. We welcome all students interested in learning to read Quran.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
