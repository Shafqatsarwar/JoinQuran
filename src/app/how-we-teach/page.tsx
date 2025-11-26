const HowWeTeachPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-dark-text">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">How We Teach 👨‍🏫</h1>
      <div className="prose lg:prose-xl mx-auto text-center">
        <p>
          You can see how convenient and easy method where anyone can learn Quran at anywhere anytime. Feel free to contact us. Sign up for free 3 days trail if you satisfy so then you need to continue. We are offering classes on daily bases just Sunday is off.
        </p>
        <p>
          We are the first and undoubtedly the best online Holy Quran tutoring and Islamic School provider working since 2008. There is no other way but to check for yourself as to why our services are above all the others in quality and excellence.
        </p>
      </div>

      <div className="flex justify-center my-8">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/YIh5uKH0lv0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default HowWeTeachPage;
