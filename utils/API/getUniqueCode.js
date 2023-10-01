import random from '@/utils/random.js';

const generateCode = () => {
  const side = random(5) > 2.5;
  const dubbleCode = random(9);

  return side
    ? `${dubbleCode.repeat(2)}-${random(9)}${random(9)}`
    : `${random(9)}${random(9)}-${dubbleCode.repeat(2)}`;
};

function getUniqueCode(codes, r) {
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
