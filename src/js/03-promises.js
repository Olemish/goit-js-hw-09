import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
const promise = new Promise((resolve, reject) => {
  // Asynchronous operation
  setTimeout(() => {
     const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position: position, delay:delay});
    } else {
      reject({ position: position, delay:delay});
    }
  }, delay);
});
  return promise
}

createPromise(2, 1500).then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });

