export const between = (start, it, end) => start < it && it < end;

export const declinationOfNumber = (number, [one, few, many]) => {
  const idx = [
    num => between(4, Math.abs(num) % 100, 21),
    num => between(1, Math.abs(num) % 10, 5),
    num => Math.abs(num) % 10 === 1,
  ].findIndex(fn => fn(number));

  return `${number}${[one, few, many][idx === -1 ? 2 : 2 - idx]}`;
};

export function emptyFn() {
  // do nothing.
}


export const generateRandomNumber = id => Number(
  new Date().getTime().toString() + id + Math.floor(Math.random() * 9)
);

export const generateRandomString = () => Math.random().toString(36).substring(2, 15);

export function preventDefault(fn) {
  return e => {
    e.preventDefault();
    fn(e);
  };
};

