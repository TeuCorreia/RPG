interface Props {
  currentStep: number;
  onChange?: (step: number) => void;
}

const conditionLabels = ['Normal', 'Desvantagem (-1)', 'Desvantagem (-2)', 'Desvantagem (-5)', 'Desvantagem (-10)', 'Inconsciente'];

export function ConditionTracker({ currentStep, onChange }: Props) {
  return (
    <div className="condition-tracker">
      <h3>Condição</h3>
      <div className="condition-steps">
        {conditionLabels.map((label, i) => (
          <div
            key={i}
            className={`condition-step ${i <= currentStep ? 'active' : ''} ${i === currentStep ? 'current' : ''}`}
            onClick={() => onChange?.(i)}
            style={{ cursor: onChange ? 'pointer' : 'default' }}
          >
            <span className="step-number">{i}</span>
            <span className="step-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
