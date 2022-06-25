import Notiflix from 'notiflix';
 
const form = document.querySelector('.form')

form.addEventListener('submit',(e)=> handelSubmit(e))

function createPromise(position, delay) {
const promise = new Promise((resolve, reject) => {
  // Asynchronous operation
  setTimeout(() => {
     const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({position: position, delay:delay});
    } else {
      reject({position: position, delay:delay});
    }
  }, delay);
});
  return promise;
}

function generatePromise(amount, delay, step) {
  let delayStep = delay

  for (let i = 1; i <= amount; i += 1, delayStep+=step) {
    console.log(delayStep)
    createPromise(i, delayStep).then(({position, delay}) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
    }).catch(({position, delay}) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    })
  }
}

function handelSubmit(e) {
  e.preventDefault();
  const amount = Number(e.target.amount.value);
  const delay = Number(e.target.delay.value);
  const step = Number(e.target.step.value);
  
  generatePromise(amount, delay, step)
}


 