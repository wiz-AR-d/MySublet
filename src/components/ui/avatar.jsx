// Avatar component - shadcn/ui style
export default function Avatar({ src, alt, className = '' }) {
  return (
    <div className={`avatar ${className}`}>
      <img src={src} alt={alt} />
    </div>
  );
}

