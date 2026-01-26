// Toast component - shadcn/ui style
export default function Toast({ message, type = 'info', onClose }) {
  return (
    <div className={`toast toast-${type}`}>
      {message}
      {onClose && <button onClick={onClose}>×</button>}
    </div>
  );
}

