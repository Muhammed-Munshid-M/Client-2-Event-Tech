const a = [2, 4, 3, 6, 5]
const b = [1,23,,45,5]
const f = [1,23,,45,5]
const d = [1,23,,45,5]
const h = [1,23,,45,5]
let sum = 0

const sample = (sum) => {
  for (let i = 0; i < a.length; i++) {
    if (i % 2 == 0) {
       sum = sum + i
    }
  }
  return sum
}

 function name(a,b) {
  sum = a + b
  return sum
}

console.log(name(2,4));

