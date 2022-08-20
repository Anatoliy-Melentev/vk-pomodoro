import click from '../sound/click.mp3';
import whist from '../sound/whist.mp3';
import dindin from '../sound/dindin.mp3';
import birds from '../sound/birds.mp3';

export const sounds = [
  [0, 'Нет', ''], [1, 'Щёлк', click], [2, 'Свист', whist], [3, 'Динь', dindin], [4, 'Щебет', birds],
];

export const playSound = sound => sound && sounds[sound] && (new Audio(sounds[sound][2])).play();

export const getCurSeconds = time => Math.trunc((time || new Date().getTime()) / 1000);

export const getDay = seconds => Math.trunc(seconds / (24 * 60 * 60));

export const getElementOffset = function (target) {
  const body = document.body?.getBoundingClientRect();
  const el = target.getBoundingClientRect();

  return [el.top - body.top, el.left - body.left];
};

export const setElementOffset = (el, [top, left]) => {
  if (el.current) {
    el.current.style.top = `${top}px`;
    el.current.style.left = `${left}px`;
  }
};

export const sendNotify = (text, icon) => {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      const n = new Notification(text, { icon, silent: true });
      setTimeout(n.close.bind(n), 4000);
    }
  });
};
