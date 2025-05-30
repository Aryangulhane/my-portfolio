// Example: Responsive Hero Section
export default function Hero() {
    return (
      <section className="text-center px-4 py-16 md:py-24 lg:py-32 bg-gradient-to-r from-blue-500 to-purple-600">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white">
          Welcome to My Portfolio
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white">
          Building responsive and modern web applications.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
            View Projects
          </button>
          <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition">
            Contact Me
          </button>
        </div>
      </section>
    );
  }