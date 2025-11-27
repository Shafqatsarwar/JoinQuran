const FeesPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">Our Fees 💰</h1>
      <div className="prose lg:prose-xl mx-auto text-center text-gray-700">
        <p>
          We are proud that since our start we have not accepted any single dollar donation from any organization or person. We are running institution on small monthly fees that we receive from students.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-700">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Monthly Fee</h2>
          <p>This package is for a single student.</p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong className="text-green-500">Plans:</strong> Plan A (6 days/week)</li>
            <li><strong className="text-green-500">Class Duration:</strong> 25-30 min/day</li>
            <li><strong className="text-green-500">Monthly Fee USA & Canada:</strong> 45$-50$</li>
            <li><strong className="text-green-500">Monthly Fee UK:</strong> 30£-35£</li>
            <li>Advance of every month</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-700">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Family Package</h2>
          <p>We have discounts for multiple family members. A family having two or more than two classes can benefit from this package.</p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong className="text-green-500">Plans:</strong> Plan A (6 days/week)</li>
            <li><strong className="text-green-500">Class Duration:</strong> 25-30 min/day</li>
            <li><strong className="text-green-500">Monthly Fee USA & Canada:</strong> 40$-45$</li>
            <li><strong className="text-green-500">Monthly Fee UK:</strong> 25£-30£</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-700">
        <p>Students other than USA & UK can use Google currency converter to see the fee in their local currency.</p>
        <a
          href="https://www.google.com/search?q=currency+converter"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:underline"
        >
          Google Currency Converter
        </a>
      </div>

      <div className="text-center mt-8">
        <a
          href="/start-learning"
          className="bg-gray-700 text-yellow-400 px-6 py-3 rounded-md shadow-md hover:bg-gray-600 transition-colors"
        >
          To Start Free Trial Sign Up Now
        </a>
      </div>
    </div>
  );
};

export default FeesPage;
