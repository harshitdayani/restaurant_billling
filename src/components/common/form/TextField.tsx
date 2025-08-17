type Props = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
}

export function TextField({ label, value, onChange, type = 'text', placeholder, disabled = false }: Props) {
return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input"
        disabled={disabled}
      />
    </label>
  );

}