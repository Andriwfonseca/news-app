interface FilterDropdownProps {
  sources: { id: string; name: string }[];
  onSelect: (value: string) => void;
}

export function FilterDropdown({ sources, onSelect }: FilterDropdownProps) {
  return (
    <select id="sourceSelect" onChange={(e) => onSelect(e.target.value)}>
      <option value="">Todas as fontes</option>
      {sources.map((source) => (
        <option key={source.id} value={source.id}>
          {source.name}
        </option>
      ))}
    </select>
  );
}
