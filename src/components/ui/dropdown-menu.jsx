// DropdownMenu component - shadcn/ui style
export default function DropdownMenu({ children, trigger }) {
  return (
    <div className="dropdown-menu">
      {trigger}
      <div className="dropdown-content">{children}</div>
    </div>
  );
}

