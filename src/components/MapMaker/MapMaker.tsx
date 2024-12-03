import { Eraser, Paintbrush } from 'lucide-react';
import { useState } from 'react';
import { useKeyboardListener } from '../../hooks/useKeyboardListener';
import { getTextures } from '../../utils/getTextures';
import { mapService } from '../../utils/map';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { BlockButton } from './components/BlockButton';
import { MapCell } from './components/MapCell';
import { MapSizeInputs } from './components/MapSizeInputs';

const isSomeInputOnFocus = () => document.activeElement?.tagName === 'INPUT';

interface MapMakerProps {
  onClose: () => void;
}

export const MapMaker: React.FC<MapMakerProps> = ({ onClose }) => {
  const [spawnError, setSpawnError] = useState(false);
  const [map, setMap] = useState<number[][]>(mapService.load());
  const [selectedBlock, setSelectedBlock] = useState<number>(0);

  useKeyboardListener('s', () => {
    if (isSomeInputOnFocus()) return;
    setSelectedBlock(-1);
  });
  useKeyboardListener('e', () => {
    if (isSomeInputOnFocus()) return;
    setSelectedBlock(0);
  });
  useKeyboardListener('1', () => {
    if (isSomeInputOnFocus()) return;
    setSelectedBlock(1);
  });
  useKeyboardListener('2', () => {
    if (isSomeInputOnFocus()) return;
    setSelectedBlock(2);
  });
  useKeyboardListener('3', () => {
    if (isSomeInputOnFocus()) return;
    setSelectedBlock(3);
  });
  useKeyboardListener('4', () => {
    if (isSomeInputOnFocus()) return;
    setSelectedBlock(4);
  });
  useKeyboardListener('5', () => {
    if (isSomeInputOnFocus()) return;
    setSelectedBlock(5);
  });

  const onUpdateCell = (x: number, y: number) => {
    setMap((prev) => {
      if (selectedBlock === -1) {
        const oldSpawnX = prev.findIndex((row) => row.includes(-1));
        const oldSpawnY =
          oldSpawnX === -1
            ? -1
            : prev[oldSpawnX].findIndex((col) => col === -1);

        if (x === oldSpawnX && y === oldSpawnY) return prev;

        if (oldSpawnX === -1 || oldSpawnY === -1) {
          return prev.map((row, yIndex) =>
            yIndex === y
              ? row.map((cell, xIndex) => (xIndex === x ? -1 : cell))
              : row
          );
        }

        const newValue = prev;

        newValue[oldSpawnX][oldSpawnY] = 0;

        return newValue.map((row, yIndex) =>
          yIndex === y
            ? row.map((cell, xIndex) => (xIndex === x ? -1 : cell))
            : row
        );
      }

      return prev.map((row, yIndex) =>
        yIndex === y
          ? row.map((cell, xIndex) => (xIndex === x ? selectedBlock : cell))
          : row
      );
    });
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-neutral-950">
      <Card className="max-h-dvh max-w-full flex flex-col">
        <MapSizeInputs
          width={map[0].length}
          height={map.length}
          onUpdateSize={(width, height) => {
            setMap((prev) => {
              let newMap = prev;

              if (height < prev.length) {
                newMap = newMap.slice(0, height);
              } else if (height > prev.length) {
                newMap = newMap.concat(
                  Array.from({ length: height - prev.length }).map(() =>
                    Array.from({ length: width }).map(() => 0)
                  )
                );
              }

              if (width < prev[0].length) {
                newMap = newMap.map((row) => row.slice(0, width));
              } else if (width > prev[0].length) {
                newMap = newMap.map((row) =>
                  row.concat(
                    Array.from({ length: width - row.length }).map(() => 0)
                  )
                );
              }

              return newMap;
            });
          }}
        />

        <CardContent className="flex-col justify-center overflow-auto">
          <div className="border-t border-l hover:cursor-crosshair">
            {map.map((row, y) => (
              <div key={y} className="flex">
                {row.map((cell, x) => (
                  <MapCell
                    key={x}
                    cell={cell}
                    selectedBlock={selectedBlock}
                    onUpdateCell={() => onUpdateCell(x, y)}
                  />
                ))}
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-4">
          <div className="w-full flex justify-around mt-4">
            <BlockButton
              isSelected={selectedBlock === 0}
              icon={<Eraser />}
              label="[E]"
              onClick={() => setSelectedBlock(0)}
            />

            <BlockButton
              isSelected={selectedBlock === -1}
              icon={<span className="block w-6 h-6 rounded-full bg-red-700" />}
              label="[S]"
              onClick={() => setSelectedBlock(-1)}
            />

            <BlockButton
              isSelected={selectedBlock === 1}
              texture={getTextures(1)}
              label="[1]"
              onClick={() => setSelectedBlock(1)}
            />

            <BlockButton
              isSelected={selectedBlock === 2}
              texture={getTextures(2)}
              label="[2]"
              onClick={() => setSelectedBlock(2)}
            />

            <BlockButton
              isSelected={selectedBlock === 3}
              texture={getTextures(3)}
              label="[3]"
              onClick={() => setSelectedBlock(3)}
            />

            <BlockButton
              isSelected={selectedBlock === 4}
              texture={getTextures(4)}
              label="[4]"
              onClick={() => setSelectedBlock(4)}
            />

            <BlockButton
              isSelected={selectedBlock === 5}
              texture={getTextures(5)}
              label="[5]"
              onClick={() => setSelectedBlock(5)}
            />
          </div>

          <Button
            className="w-full"
            variant="destructive"
            onClick={() => {
              setMap((prev) => prev.map((row) => row.map(() => 0)));
            }}
          >
            <Paintbrush />
            Limpar
          </Button>

          <div className="w-full flex gap-2">
            <Button className="w-full" variant="outline" onClick={onClose}>
              Voltar
            </Button>

            <Button
              className="w-full"
              onClick={() => {
                const haveSpawn =
                  map.findIndex((row) => row.includes(-1)) !== -1;

                if (!haveSpawn) {
                  setSpawnError(true);
                  return;
                }

                mapService.save(map);
                onClose();
              }}
            >
              Salvar
            </Button>
          </div>

          {spawnError && (
            <p className="text-red-500 text-sm">O mapa precisa ter um spawn.</p>
          )}
        </CardFooter>
      </Card>
    </main>
  );
};
