function throttle(f, ms) {
  let isThrottled = false;
  let savedThis = null;
  let savedArgs = null;
  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    f.apply(this, arguments);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs){
        wrapper.apply(savedThis, savedArgs);
        savedArgs = null;
        savedThis = null;
      }
    }, ms);
  }
}