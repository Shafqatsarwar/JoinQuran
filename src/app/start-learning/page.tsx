import React from 'react';

const StartLearningPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-dark-text">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">Start Learning ✨</h1>
      <div className="prose lg:prose-xl mx-auto text-center">
        <p>
          Our Quran learning program is for children or any person of any age. Because being a Muslim it is most important thing in our life to learn and understand Quran and Islam, and in this country it is very difficult to learn about our religion. The best thing of this service is that you don&apos;t have to go anywhere, You will be learning Quran while at your home, with the help of computer and internet at any your convenient time in 24hours. (JAZAK ALLAH)
        </p>
        <p>
          You just need to have a computer and high speed interned. With this you can down load two programs by the internet at your computer after downloading and installing of them u need to sign up here and send us your contact id of both programs we will contact you as shortly. And for further guide you can contact us.
        </p>
        <div className="mt-8 not-prose">
          <h2 className="text-2xl font-bold text-center text-primary mb-4">Contact Information</h2>
          <div className="flex flex-col items-center space-y-2 text-lg font-semibold text-dark-text">
            <p>Email: <span className="text-primary">{process.env.NEXT_PUBLIC_EMAIL}</span></p>
            <p>Call: <span className="text-primary">{process.env.NEXT_PUBLIC_PHONE_UK}</span></p>
            <p>Teams: <span className="text-primary">{process.env.NEXT_PUBLIC_TEAMS_ID}</span></p>
          </div>
        </div>
        <div className="mt-8 not-prose">
          <h2 className="text-2xl font-bold text-center text-primary mb-4">Get Started</h2>
          <p className="text-lg mb-8 text-gray-600">
            Let&apos;s get you started on your journey to learning the Quran.
          </p>
          <div className="flex justify-center mt-4">
            <a href="https://www.microsoft.com/en-us/microsoft-teams/download-app" target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-8 py-3 rounded-full shadow-lg hover:bg-teal-700 transition-all transform hover:scale-105 font-bold">
              Download Microsoft Teams
            </a>
          </div>
        </div>
        <div className="mt-8 not-prose">
          <h2 className="text-2xl font-bold text-center text-primary mb-4">Ready to Start Your Free Trial?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all transform hover:scale-105 font-bold text-center">
              Sign Up with WhatsApp
            </a>
            <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} className="bg-secondary text-white px-8 py-3 rounded-full shadow-lg hover:bg-sky-600 transition-all transform hover:scale-105 font-bold text-center">
              Sign Up with Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartLearningPage;
