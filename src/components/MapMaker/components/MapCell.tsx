import { useState } from 'react';
import { getTextures } from '../../../utils/getTextures';

interface MapCellProps {
  cell: number;
  selectedBlock?: number;
  onUpdateCell: () => void;
}

export const MapCell: React.FC<MapCellProps> = ({
  cell,
  selectedBlock,
  onUpdateCell,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const tex = getTextures(
    selectedBlock && selectedBlock > 0 && isHovering ? selectedBlock : cell
  );

  const handleUpdateCell = (event: React.MouseEvent) => {
    event.preventDefault();

    if (selectedBlock === -1 && cell > 0) return;

    onUpdateCell();
  };

  return (
    <div className="relative group">
      <div
        className="absolute w-6 h-6 "
        onMouseDown={handleUpdateCell}
        onMouseEnter={(e) => {
          if (e.buttons === 1 && selectedBlock !== -1) {
            onUpdateCell();
          }

          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
      />

      <div
        className={`w-6 h-6 border-b border-r ${
          !selectedBlock ? 'group-hover:bg-neutral-800' : ''
        }`}
      >
        {cell === -1 || (selectedBlock === -1 && cell === 0 && isHovering) ? (
          <span className="pointer-events-none block absolute top-[calc(50%-0.375rem)] left-[calc(50%-0.375rem)] w-3 h-3 rounded-full bg-red-700" />
        ) : null}

        {tex && (
          <img
            className={`w-full h-full pointer-events-none ${
              !selectedBlock ? 'group-hover:opacity-50' : ''
            }`}
            src={tex}
          />
        )}
      </div>
    </div>
  );
};
