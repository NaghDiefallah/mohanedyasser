import ScrollReveal from "./ScrollReveal";

const techTools = [
  { name: "Adobe Premiere Pro", icon: "Pr" },
  { name: "After Effects", icon: "Ae" },
  { name: "DaVinci Resolve", icon: "DR" },
  { name: "Photoshop", icon: "Ps" },
  { name: "Illustrator", icon: "Ai" },
  { name: "Cinema 4D", icon: "C4D" },
];

const TechStack = () => {
  return (
    <ScrollReveal>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">Tools & Tech</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techTools.map((tool) => (
              <div 
                key={tool.name}
                className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <span className="text-sm font-bold text-primary">{tool.icon}</span>
                <span className="text-sm text-muted-foreground">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default TechStack;
