export default function getRandomInteger(min, max) {
  min = Math.max(0, min);

  const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomInteger;
}
