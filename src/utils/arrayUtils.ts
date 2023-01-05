export const addItemToArray = <T>(array: T[], item: T, index: number): T[] => {
  if (index < 0 || index > array.length) {
    return array;
  }
  return [...array.slice(0, index), item, ...array.slice(index)];
}; // addItemToArray

/**
 * Applies `transformer` to element at position `index` of `array`. Note that this operation
 * mutates the original array.
 */
export const transformItemFromArrayByIndex = <T>(
  array: T[],
  index: number,
  transformer: (item: T) => T
): T[] => {
  if (index < 0 || index >= array.length) {
    return array;
  }
  return array.map((elem, i) => (i === index ? transformer(elem) : elem));
}; // transformItemFromArrayByIndex

/**
 * Applies `transformer` to element with id `_id` of `array`. Note that this operation
 * mutates the original array.
 */
export const transformItemFromArrayById = <T extends { _id: string }>(
  array: T[],
  _id: string,
  transformer: (item: T) => T
): T[] => {
  return array.map((elem) => (elem._id === _id ? transformer(elem) : elem));
}; // transformItemFromArrayById

/**
 * Removes element at position `index` of `array`. Note that this operation
 * mutates the original array.
 */
export const removeItemFromArrayByIndex = <T>(
  array: T[],
  index: number
): T[] => {
  if (index < 0 || index >= array.length) {
    return array;
  }
  return array.filter((_, i) => i !== index);
}; // removeItemFromArrayByIndex

/**
 * Removes element with id `_id` from `array`. Note that this operation
 * mutates the original array.
 */
export const removeItemFromArrayById = <T extends { _id: string }>(
  array: T[],
  _id: string
): T[] => {
  return array.filter((elem) => elem._id !== _id);
}; // removeItemFromArrayById

/**
 * Duplicates element at position `index` of `array`. Note that this operation
 * mutates the original array.
 */
export const duplicateItemFromArrayByIndex = <T>(
  array: T[],
  index: number
): T[] => {
  if (index < 0 || index >= array.length) {
    return array;
  }
  return addItemToArray(array, array[index], index);
}; // duplicateItemFromArrayByIndex

/**
 * Duplicates element with id `_id` from `array`. Note that this operation
 * mutates the original array.
 */
export const duplicateItemFromArrayById = <T extends { _id: string }>(
  array: T[],
  _id: string
): T[] => {
  const index = array.findIndex((elem) => elem._id === _id);
  if (index < 0) return array;

  return addItemToArray(array, array[index], index);
}; // duplicateItemFromArrayById

/**
 * Applies a position with offset `offset` to item with given index in `array`.
 * Note that this operation mutates the original array.
 */
export const moveItemFromArrayByIndex = <T>(
  array: T[],
  index: number,
  offset: number
): T[] => {
  if (
    index < 0 ||
    index >= array.length ||
    index + offset < 0 ||
    index + offset >= array.length
  ) {
    return array;
  }

  const stageToMove = array[index];

  // caso 1: offset > 0; la posición está más adelante en el array
  if (offset > 0) {
    return [
      // el lado izquierdo se mantiene intacto
      ...array.slice(0, index),
      // eliminamos el objeto en la posición original, y colocamos los contenidos
      // del array original hasta el objeto que tenía la posición originalIndex + offset,
      // que pasará a estar desplazado una posición a la izquierda
      ...array.slice(index + 1, index + 1 + offset),
      // colocamos el objeto que queríamos desplazar en la posición con offset
      stageToMove,
      // colocamos lo que quedaba del array después de dicha posición
      ...array.slice(index + offset + 1),
    ];
  }
  // caso 2: offset < 0; la posición está más atrás en el array
  else if (offset < 0) {
    return [
      // colocamos lo que quedaba del array antes de dicha posición
      ...array.slice(0, index + offset),
      // colocamos el objeto que queríamos desplazar en la posición con offset
      stageToMove,
      // eliminamos el objeto en la posición original, y colocamos los contenidos
      // del array original hasta el objeto que tenía la posición originalIndex + offset,
      // que pasará a estar desplazado una posición a la derecha
      ...array.slice(index + offset, index),
      // el lado derecho se mantiene intacto
      ...array.slice(index + 1),
    ];
  }
  return array;
}; // moveItemFromArrayByIndex

/**
 * Applies a position with offset `offset` to item with given _id in `array`.
 * Note that this operation mutates the original array.
 */
export const moveItemFromArrayById = <T extends { _id: string }>(
  array: T[],
  _id: string,
  offset: number
): T[] => {
  const itemIndex = array.findIndex((elem) => elem._id === _id);
  if (itemIndex < 0) return array;

  return moveItemFromArrayByIndex(array, itemIndex, offset);
}; // moveItemFromArrayById
