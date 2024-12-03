const KEY = 'map';

const defaultMap = [
  [1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [1, 0, 0, 0, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  [1, 0, -1, 0, 1, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5],
  [1, 0, 0, 0, 1, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 5],
  [1, 1, 0, 1, 1, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 5],
  [0, 1, 0, 1, 0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 0, 5],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [2, 2, 0, 2, 2, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3],
  [4, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 4, 0, 0],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
];

const load = (): number[][] => {
  const savedMap = localStorage.getItem(KEY);

  if (savedMap) return JSON.parse(savedMap);

  return defaultMap;
};

const save = (map: number[][]) => {
  localStorage.setItem(KEY, JSON.stringify(map));
};

export const mapService = {
  load,
  save,
};
