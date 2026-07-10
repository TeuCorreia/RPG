import { calculateEncumbrance } from '../../utils/abilityValidation';
import type { Character } from '../../types';

interface Props {
  character: Character;
}

export default function EncumbranceTracker({ character }: Props) {
  const encumbrance = calculateEncumbrance(character);

  const percentage = Math.min(
    100,
    (encumbrance.totalWeight / encumbrance.maxCapacity) * 100
  );

  const getStatusColor = () => {
    if (encumbrance.isOverloaded) return '#ff4444';
    if (encumbrance.isEncumbered) return '#ffaa00';
    return '#44ff44';
  };

  const getStatusText = () => {
    if (encumbrance.isOverloaded) return 'Sobrecarregado';
    if (encumbrance.isEncumbered) return 'Sobrecarregado';
    return 'Normal';
  };

  return (
    <div className="encumbrance-tracker">
      <div className="encumbrance-header">
        <span className="encumbrance-title">Capacidade de Carga</span>
        <span
          className="encumbrance-status"
          style={{ color: getStatusColor() }}
        >
          {getStatusText()}
        </span>
      </div>

      <div className="encumbrance-bar-container">
        <div className="encumbrance-bar">
          <div
            className="encumbrance-fill"
            style={{
              width: `${percentage}%`,
              backgroundColor: getStatusColor(),
            }}
          />
          <div
            className="encumbrance-threshold light"
            style={{ left: '50%' }}
          />
          <div
            className="encumbrance-threshold heavy"
            style={{ left: '100%' }}
          />
        </div>
      </div>

      <div className="encumbrance-values">
        <span>
          {encumbrance.totalWeight.toFixed(1)} / {encumbrance.maxCapacity} kg
        </span>
      </div>

      <div className="encumbrance-legend">
        <div className="legend-item">
          <span className="legend-color normal" />
          <span>Normal (0-50%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color encumbered" />
          <span>Sobrecarregado (50-100%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color overloaded" />
          <span>Sobrecarregado (100%+)</span>
        </div>
      </div>

      {encumbrance.isEncumbered && (
        <div className="encumbrance-penalties">
          <p>
            <strong>Penalidades de Sobrecarga:</strong>
          </p>
          <ul>
            <li>-2 nos testes de ataque</li>
            <li>-2 nos testes de resistência</li>
            <li>-5 deslocamento</li>
          </ul>
        </div>
      )}
    </div>
  );
}
