const CoursesPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">Our Courses 📚</h1>
      <div className="grid md:grid-cols-2 gap-8 text-dark-text">
        <div className="p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-3xl font-bold text-primary mb-4">Nazra-e-Quran / Hifz-e-Quran</h2>
          <p className="mb-4">
            Nazra is to read the Holy Quran verbally, without translation and memorization and Hifz is the memorization of the Holy Quran by heart. Hifz course is particularly designed for those who has already taken Nazra-e-Quran, but you may took this course depending upon the student’s capability.
          </p>
          <h3 className="text-2xl font-bold text-primary mb-2">These courses include:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Tajweed (Pronunciation of Holy Quran with the rules of Tajweed)</li>
            <li>Memorization of five time daily Prayers.</li>
            <li>Method of Funeral and Eid Prayers.</li>
            <li>Memorization of various Prayers (Duas)</li>
            <li>Memorization of a few short Suras for Nazra Students (chapters)</li>
          </ul>
        </div>
        <div className="p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-3xl font-bold text-primary mb-4">Translation of Holy Quran</h2>
          <p className="mb-4">
            It is to read the Holy Quran through meanings and word to word translation into English and Urdu.
          </p>
          <h3 className="text-2xl font-bold text-primary mb-2">This course includes:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Tajweed (Pronunciation of Holy Quran with the rules of Tajweed)</li>
            <li>Memorization of five time daily Prayers.</li>
            <li>Method of Funeral and Eid Prayers.</li>
            <li>Memorization of various Prayers (Duas)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
