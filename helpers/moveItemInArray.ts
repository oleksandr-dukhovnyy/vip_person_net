const move = <T>(arr: T[], fromIndex: number, toIndex: number) => {
  const triggers = [
    !!arr[fromIndex] && fromIndex !== 0,
    !!arr[toIndex] && toIndex !== 0,
    !(arr instanceof Array),
  ];

  const argsOk = triggers.some((r) => r);

  if (argsOk) {
    const item = arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, item[0]);
  } else {
    console.error(arr, fromIndex, toIndex);
    console.error(triggers);
    throw 'uncurrect args';
  }
};

export default move;
