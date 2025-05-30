export default function Projects() {
    const projects = [
      { name: 'Project 1', link: '/projects/1' },
      { name: 'Project 2', link: '/projects/2' },
      { name: 'Project 3', link: '/projects/3' },
    ];
  
    return (
      <section className="px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              className="block bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="mt-2 text-gray-600">Click to explore more about this project.</p>
            </a>
          ))}
        </div>
      </section>
    );
  }