type Props = { value: string; onChange: (val: string) => void; placeholder?: string };

export function SearchBox({ value, onChange, placeholder = "Search menu..." }: Props) {
  return (
    <input
      className="input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search menu items"
      type="text"
    />
  );
}
