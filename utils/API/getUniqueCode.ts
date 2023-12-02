import random from '~/utils/random';

const generateCode = () => {
  const side = random(10) > 5;
  const dash = random(10) > 5 ? '-' : '';
  const dabbleCode = '' + random(9);

  return side
    ? `${dabbleCode.repeat(2)}${dash}${random(9)}${random(9)}`
    : `${random(9)}${random(9)}${dash}${dabbleCode.repeat(2)}`;
};

/**
 * Generates a unique code that is not included in the given array of codes.
 * If it fails to generate a unique code after 1000 attempts, it throws an error.
 *
 * @param {Array} codes - An array of codes to check uniqueness against.
 * @param {number} r - The number of attempts made to generate a unique code.
 * @return {string} - The generated unique code.
 */
function getUniqueCode(codes: string[], r = 0) {
  if (r >= 1e3) {
    alert('Не могу сгенерировать уникальный код!');
    throw 'cannot generate code';
  }

  const code = generateCode();

  if (codes.includes(code)) {
    return getUniqueCode(codes, ++r);
  } else {
    return code;
  }
}

export default getUniqueCode;
