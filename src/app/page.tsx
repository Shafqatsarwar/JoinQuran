import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* 
        Hero Section 
        TODO: Replace # with a real image path in public folder. e.g. /islamic-background.jpg
      */}
      <section
        className="relative bg-[#1e293b] text-white bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/islamic-pattern-bg.jpg')" }} // Placeholder, but we'll add a gradient overlay
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b]/95 via-[#334155]/90 to-[#1e293b]/95 mix-blend-multiply"></div>
        <div className="relative container mx-auto px-4 py-32 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-md tracking-tight">
            Learn Quran Online <br /> with <span className="text-orange-500">Qualified Tutors</span> 🌙
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light text-gray-100">
            Join our online Quran classes and learn from the comfort of your home.
          </p>
          <Link href="/start-learning" className="bg-orange-500 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:bg-orange-600 hover:shadow-2xl transition-all transform hover:scale-105 inline-block border-2 border-transparent hover:border-white/20">
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-[#1e293b] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-8">Our Mission</h2>
          <div className="prose lg:prose-xl mx-auto text-gray-200 max-w-4xl">
            <p className="leading-relaxed mb-4">
              Tajweed means to pronounce or recite every letter correctly, i.e. from its proper origin of pronunciation coupled with its stipulated attributes such as prolongation (Madd), merging (Idgham), conversion (Iqlab), and pauses (Waqaf) etc. Tajweed and its application can only be learned with a qualified Quran teacher. The rules themselves can be studied independently, but the correct application and proper pronunciation of the alphabets of Quran can only be done by reading to, listening to, reciting to, and being corrected by a qualified teacher of the Quran.
            </p>
            <p className="leading-relaxed mb-4">
              Our courses are especially designed for you and your child. This program will provide you step by step Quran Learning with the rules of Tajweed and Essential Islamic Teaching For children and new Muslims by online Qualified Tutors and what's more… All this by just sitting in front of Computer without leaving your home. We have the mission to serve the Muslim community by giving them Online Quran reading and Islamic education with more ease.
            </p>
            <p className="leading-relaxed">
              Learn to read Quran online. Our online Quran tutors equip students with the skill to read the Quran correctly and enhance students to memorize Quran, Salat, Kalimas, Hadeeth and Dua's.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
