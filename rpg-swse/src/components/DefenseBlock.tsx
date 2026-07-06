interface DefenseItem {
  label: string;
  value: number;
}

interface Props {
  defenses: DefenseItem[];
}

export function DefenseBlock({ defenses }: Props) {
  return (
    <div className="defense-block">
      <h3>Defesas</h3>
      <div className="defense-grid">
        {defenses.map(d => (
          <div key={d.label} className="defense-item">
            <span className="defense-label">{d.label}</span>
            <span className="defense-value">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
