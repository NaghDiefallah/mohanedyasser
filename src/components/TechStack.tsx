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
      <section className="py-16 border-y border-border/50 overflow-hidden">
        <div className="ticker-wrapper">
          <div className="ticker-content">
            {/* First set */}
            {techTools.map((tool, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center gap-4 px-8 py-4 glass rounded-xl min-w-fit group cursor-pointer transition-all duration-300 hover:border-primary/50"
              >
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center font-bold text-lg text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-300">
                  {tool.icon}
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-medium whitespace-nowrap">
                  {tool.name}
                </span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {techTools.map((tool, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center gap-4 px-8 py-4 glass rounded-xl min-w-fit group cursor-pointer transition-all duration-300 hover:border-primary/50"
              >
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center font-bold text-lg text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-300">
                  {tool.icon}
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-medium whitespace-nowrap">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default TechStack;
