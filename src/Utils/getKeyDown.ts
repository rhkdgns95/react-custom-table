export const getKeyDown = (keyCode: number): string => {
    return {
      37: "LEFT",
      38: "UP",
      39: "RIGHT",
      40: "DOWN"
    }[keyCode];
  };
  