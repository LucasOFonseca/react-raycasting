export const getTextures = (index: number) => {
  const textures: { [key: number]: string } = {
    1: '/assets/greystone.png',
    2: '/assets/mossy.png',
    3: '/assets/redbrick.png',
    4: '/assets/wood.png',
    5: '/assets/colorstone.png',
  };

  return textures[index];
};
