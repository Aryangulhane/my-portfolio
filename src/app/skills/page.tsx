
// src/app/skills/page.tsx
export default function SkillsPage() {
    return (
      <section className="space-y-6 animate-slide-up">
        <h2 className="text-3xl font-bold text-center">💡 Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {["Embedded Systems (ESP32, Arduino)", "Python, JavaScript, TypeScript", "Next.js, Tailwind CSS, React", "AI/ML Fundamentals", "Problem Solving, Debugging"].map((skill, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-4 hover:scale-105 transition">
              {skill}
            </div>
          ))}
        </div>
      </section>
    );
  }
  