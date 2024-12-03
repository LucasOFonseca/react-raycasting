import { useState } from 'react';
import { CardHeader } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

interface MapSizeInputsProps {
  width: number;
  height: number;
  onUpdateSize: (width: number, height: number) => void;
}

export const MapSizeInputs: React.FC<MapSizeInputsProps> = ({
  width,
  height,
  onUpdateSize,
}) => {
  const [widthValue, setWidthValue] = useState(width);
  const [heightValue, setHeightValue] = useState(height);

  return (
    <CardHeader className="flex-row justify-center items-end gap-4">
      <div className="grid items-center gap-1">
        <Label>Largura</Label>
        <Input
          type="number"
          value={widthValue}
          onChange={(e) => setWidthValue(Number(e.target.value))}
          onBlur={(e) => {
            const value = Number(e.target.value);
            setWidthValue(value < 10 ? 10 : value > 30 ? 30 : value);

            onUpdateSize(
              value < 10 ? 10 : value > 30 ? 30 : value,
              heightValue
            );
          }}
        />
      </div>

      <span>X</span>

      <div className="grid items-center gap-1">
        <Label>Altura</Label>
        <Input
          type="number"
          value={heightValue}
          onChange={(e) => setHeightValue(Number(e.target.value))}
          onBlur={(e) => {
            const value = Number(e.target.value);
            setHeightValue(value < 10 ? 10 : value > 30 ? 30 : value);

            onUpdateSize(widthValue, value < 10 ? 10 : value > 30 ? 30 : value);
          }}
        />
      </div>
    </CardHeader>
  );
};
