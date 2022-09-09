'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => { return acc + cur }, 0)
  labelBalance.textContent = `${acc.balance} €`
}


/////////////////////////////////////////////////
const displayMovements = function (acc) {

  containerMovements.innerHTML = ' '
  acc.movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal"
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          
        

          <div class="movements__value">${mov} €</div>
        </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html)
  })
}





const displaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur)
  labelSumIn.textContent = `${incomes} €`
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0)
  labelSumOut.textContent = `${Math.abs(out)} €`

  const interests = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0)

  labelSumInterest.textContent = `${interests} €`
}



const createUsername = (accs) => {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(word => word[0])
      .join('')


  })
}


createUsername(accounts)

// console.log(accounts)

///////////////////////////////////////////////////////////////////////////////////////

let currentAccount, timer;

// Fake always login
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;


const now = new Date()
const date = `${now.getDate()}`.padStart(2, 0)
const month = `${now.getMonth() + 1}`.padStart(2, 0)
const year = now.getFullYear()
const hour = now.getHours()
const minutes = now.getMinutes()


labelDate.textContent = `${year}-${month}-${date}`

// Login Event

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(account => account.username === inputLoginUsername.value);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display welcome and UI
    labelWelcome.textContent = `Welcome back ,${currentAccount.owner.split(" ")[0]}`

    containerApp.style.opacity = 100;

    // Clear value
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur()
    if (timer) clearInterval(timer)
    timer = setLogOutTimer()

    updateUI(currentAccount);
  }
})



// Transfer Event

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const transferAmount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value)


  inputTransferAmount.value = inputTransferTo.value = " "
  if (transferAmount > 0 && currentAccount.balance >= transferAmount && receiverAccount?.username !== currentAccount.username) {
    currentAccount.movements.push(-transferAmount)
    receiverAccount.movements.push(transferAmount)

    updateUI(currentAccount)
    // resetting timer
    clearInterval(timer)
    timer = setLogOutTimer()

    console.log("transfer valid", currentAccount.movements, receiverAccount.movements)
  }


})


btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === Number(currentAccount.pin)) {
    const accIndex = accounts.findIndex(acc => acc.username === currentAccount.username)
    accounts.splice(accIndex, 1)

    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Login to get Started `


  }
  inputCloseUsername.value = inputClosePin.value = ''

})
// Loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const requestedLoan = Number(inputLoanAmount.value)
  if (requestedLoan > 0 && currentAccount.movements.some(mov => mov >= requestedLoan * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(requestedLoan)
      updateUI(currentAccount)
      // resetting timer
      clearInterval(timer)
      timer = setLogOutTimer()
    }, 3000)


  }
  inputLoanAmount.value = ''
})
///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const JuliaData = [5, 2];
// const KateData = [4, 1, 15, 8, 3];
// const Julia2Data = [9, 16, 6, 8, 3];
// const Kate2Data = [10, 5, 6, 1, 4];

// const dogFilter = function (list) {


//   list.forEach((val, i) => {
//     const type = val <= 2 ? "a puppy" : "an adult"


//     console.log(`Dog number ${i + 1} is ${type}, and is ${val} years old`)

//   })
// }

// dogFilter(JuliaData)
// dogFilter(KateData)
// dogFilter(Julia2Data)
// dogFilter(Kate2Data)


const convRate = 2

const movementsPkr = movements.map(mov => mov * convRate)

// console.log(movements)
const movementsDescriptions = movements.map((mov, i) =>
  `Movement ${i + 1} , You ${mov > 0 ? "deposited" : "withdraw"} ${Math.abs(mov)} `
)

// console.log(movementsDescriptions);
const deposits = movements.filter((mov) => mov > 0)
const withdrawals = movements.reduce((acc, cur, i, movements) => {

  if (cur < 0)
    return cur


}, movements[0])

// console.log(withdrawals)

const balance = movements.reduce((acc, cur) => { return acc + cur }, 0)
// console.log(balance)

const max = movements.reduce(function (acc, mov) {
  if (acc > mov)
    return acc
  else
    return mov
}, movements[0])


function updateUI(currentAccount) {

  // Display movements
  displayMovements(currentAccount);
  // Display balance
  calcDisplayBalance(currentAccount);
  // Display Summary
  displaySummary(currentAccount);
}
// console.log(max)


///////////////////////////////////////
// Coding Challenge #2 + 3

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const calcAverageHumanAge = dogs =>
//   dogs
//     .map(age => age <= 2 ? age * 2 : 16 + age * 4)
//     .filter(age => age >= 18)
//     .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)




// // console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]))


// const account = accounts.find(acc => acc.owner === "Sarah Smith")

// console.log(account)


// console.log(Array.from({ length: 100 }, () => ((Math.random() * 6).toFixed(0))))


labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(document.querySelectorAll(".movements__value"), el => Number(el.textContent.replace("€", ""))



  )
  console.log(movementsUI)

})

const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0)


// const depositsOver1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length


// const depositsOver1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0)

const depositsOver1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0)

// Prefix ++ operation
// let a = 10;
// console.log(--a)
// console.log(depositsOver1000)


// reduce outputting objects
const movementsObj = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur)
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;

      return sums
    }
    , { deposits: 0, withdrawals: 0 })

// console.log(movementsObj)


// const titleCase = (title) => {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1)
//   const exceptions = ['a', 'an', 'with', 'and', 'the', 'on', 'with']
//   const titleCase = title.toLowerCase().split(" ").map(word => exceptions.includes(word) ? word : capitalize(word)).join(" ")

//   return capitalize(titleCase)

// }


// console.log(titleCase("and is A good title to be tested"))



///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Formula: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
const recommendedFood = (weight) => {

  const food = (weight) ** 0.75 * 28
  return Number(food.toFixed(0))
}
// 1 Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Formula: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
//

dogs.forEach(dog => {
  dog.recommendedFood = recommendedFood(dog.weight)
})

// console.log(dogs)

// 2  Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓 current > (recommended * 0.90) && current < (recommended * 1.10)

const dogSarah = dogs.find(dog => dog.owners.some(owner => owner === 'Sarah'))

const checkEatingOkay = (dog) => {
  let check;
  if (dog.curFood > dog.recommendedFood * 0.90 && dog.curFood < dog.recommendedFood * 1.10) {
    // console.log("The dog is eating okay")
    check = 'okay'
  } else if (dog.curFood > dog.recommendedFood * 0.90) {
    // console.log('The dog is over eating')

    check = 'over'
  } else if (dog.curFood < dog.recommendedFood * 1.10) {
    check = 'under'
    // console.log('The dog is not eating enough food')

  }

  return check
}
// console.log(checkEatingOkay(dogSarah))


// 3 Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').


const ownersEatTooMuch = dogs
  .filter(dog => checkEatingOkay(dog) === "over")
  .flatMap(dog => dog.owners)

const ownersEatTooLittle = dogs
  .filter(dog => checkEatingOkay(dog) === "under")
  .flatMap(dog => dog.owners)

console.log(ownersEatTooMuch)
console.log(ownersEatTooLittle)


// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"


console.log(`${ownersEatTooMuch.join(" and ")}'s dogs are eating too much `)
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!`)


// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

console.log(dogs.some(dog => dog.curFood == recommendedFood(dog.weight)))

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
console.log(dogs.some(dog => checkEatingOkay(dog) === "okay"))


// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)


const dogEatingOk = dogs.filter(dog => checkEatingOkay(dog) === "okay")

console.log(dogEatingOk)


// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

// const arrayDogs = dogs.reduce((dog, cur) => {
//   if (dog.recommendedFood > )
// }, dog)

// console.log(arrayDogs)

const num = 323232.33
console.log(`${navigator.language} for ${Intl.NumberFormat("de-DE").format(num)}`)


setTimeout((olive, mirchi) => console.log(`your pizza have arrived with ${olive} and ${mirchi}`), 4000, "olive", "sabz mirch")
console.log("waiting...")

// setInterval(function () {
//   const now = new Date()
//   // const hour = now.getHours()
//   // const minutes = now.getMinutes()
//   // const seconds = now.getSeconds()

//   // console.log(`${hour}:${minutes}:${seconds}`)
//   const options = {
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric"
//   }

//   console.log(Intl.DateTimeFormat("en-US", options).format(now))
// }
//   , 1000
// )

const setLogOutTimer = function () {
  const tick = function () {


    const min = String(Math.trunc(start / 60)).padStart(2, 0)
    const seconds = String(Math.trunc(start % 60)).padStart(2, 0)
    labelTimer.textContent = `${min}:${seconds}`
    if (start === 0) {
      clearInterval(timer)
      labelWelcome.textContent = "log in to your account"
      containerApp.style.opacity = 0
    }


    start--
  }
  let start = 100
  tick()
  const timer = setInterval(tick, 1000)


}