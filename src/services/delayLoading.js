var delay = function(ms = 2000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};

function delayCancelable(beforeLoad, loading, afterLoad, condition, ms = 3500) {
  beforeLoad();
  delay(ms).then(() => {
    if (!condition()) {
      loading();
    }
    afterLoad();
  });
}

const time = {
  short: 1000,
  mid: 2000,
  long: 3000
}

export { delay, delayCancelable, time };
