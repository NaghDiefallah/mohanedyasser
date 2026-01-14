import ScrollReveal from "./ScrollReveal";
const techTools = [{
  name: "Adobe Premiere Pro",
  icon: "Pr"
}, {
  name: "After Effects",
  icon: "Ae"
}, {
  name: "DaVinci Resolve",
  icon: "DR"
}, {
  name: "Photoshop",
  icon: "Ps"
}, {
  name: "Illustrator",
  icon: "Ai"
}, {
  name: "Cinema 4D",
  icon: "C4D"
}];
const TechStack = () => {
  return (
    <ScrollReveal className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-bold">
            Tools & Tech
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {techTools.map((tool) => (
            <div
              key={tool.name}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white font-bold text-lg group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                {tool.icon}
              </div>
              <span className="text-muted-foreground text-xs">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};
export default TechStack;