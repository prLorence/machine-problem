const context = {
  approximationMethod: ""
}

export const calculateApproximation = Object.create(context);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf

const strategy = {
  setStrategy: function (approximationMethod) {
    this.approximationMethod = approximationMethod;
  },

  calculate: function (equation, decimalPlace) {
    return this.approximationMethod.calculate(equation, decimalPlace);
  }
}

Object.setPrototypeOf(calculateApproximation, strategy);