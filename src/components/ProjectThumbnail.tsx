import { Project } from "@/data/projects";

interface ProjectThumbnailProps {
  project: Project;
  alt?: string;
  className?: string;
  sizes?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  fetchPriority?: "high" | "low" | "auto";
}

const ProjectThumbnail = ({
  project,
  alt,
  className,
  sizes,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
}: ProjectThumbnailProps) => {
  const resolvedAlt = alt ?? project.title;
  const resolvedSizes = sizes ?? project.thumbnailSizes;

  if (project.thumbnailSrcSet) {
    return (
      <picture className="block w-full h-full">
        <source type="image/avif" srcSet={project.thumbnailSrcSet.avif} sizes={resolvedSizes} />
        <source type="image/webp" srcSet={project.thumbnailSrcSet.webp} sizes={resolvedSizes} />
        <img
          src={project.thumbnail}
          alt={resolvedAlt}
          loading={loading}
          decoding={decoding}
          fetchPriority={fetchPriority}
          className={className}
        />
      </picture>
    );
  }

  return (
    <img
      src={project.thumbnail}
      alt={resolvedAlt}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      className={className}
    />
  );
};

export default ProjectThumbnail;
