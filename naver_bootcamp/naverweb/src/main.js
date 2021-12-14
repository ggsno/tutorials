function hi() {
  this.aa = 3;
}

console.log(hi.prototype.constructor.aa);