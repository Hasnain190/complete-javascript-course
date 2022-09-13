'use strict';

// creating a constructor function
// const Person = function (name, birthYear) {
//     this.firstName = name;
//     this.birth = birthYear;

//     // Never do this to create a method 
//     // this.calcAge = function () {
//     //     console.log(2022 - this.birth)
//     // }
// }

// const Jonas = new Person("Jonas", 1991)
// const hasnain = new Person("Hasnain", 2000)

// console.log(Person.prototype)




// 1. a new { } is created
// 2. this => that {}
// 3. {} is linked to the prototype
// 4. function automatically return {} with filled valued


// Person.prototype.calcAge = function () {
//     console.log(2022 - this.birth)
// }


// hasnain.calcAge()


// Jonas.calcAge()

// console.log(hasnain.__proto__)
// console.log(hasnain.__proto__ === Person.prototype)
// console.log(hasnain.isPrototypeOf(Person))
// console.log(Person.isPrototypeOf(hasnain))
// console.log(Person.__proto__)
// console.log(Person.hasOwnProperty("calcAge"))
// console.log(Person.prototype.hasOwnProperty("calcAge"))

// console.dir(Person.prototype.__proto__.constructor)


// const arr = [23, 23, 123, 23, 3, 56, 788, 53]

// console.log(arr.__proto__.__proto__)

// Array.prototype.unique = function () {
//     return [... new Set(this)]
// }

// console.log(arr.unique())

// const h1 = document.querySelector("h1")

///////////////////////////////////////////////////
// Coding Challenge #1

// function Car(make, speed) {

//     this.speed = speed
//     this.make = make





// }

// Car.prototype.accelerate = function () {
//     this.speed += 10
//     console.log(this.speed)
// }
// Car.prototype.brake = function () {
//     this.speed -= 5
//     console.log(this.speed)
// }

// const BMW = new Car("BMV", 120)
// const Mercedes = new Car("Mercedes", 95)


// console.log(BMW)

// BMW.accelerate()
// BMW.accelerate()
// BMW.accelerate()
// BMW.brake()
// BMW.accelerate()

// ES6 Classes


// class expression 
// const Parents = class{}

// class declarations
class Parents {
    constructor(mother, father) {
        this.mother = mother;
        this.father = father;
        this.child = {
            num: 0,
            name: undefined,
            surName: undefined
        }

    }


    giveBirth(name) {
        this.child.num += 1
        this.child.name = name

        console.log(`congratulations. Now you have ${this.child.name} Child`)
    }
    get surName() {
        if (this.father.includes("")) {
            return this.father.split(" ")[1]
        } else {
            return "Your father does'nt have a surname"
        }
    }

    // setSurname() {
    //     if (this.father.includes(" ")) {
    //         this.child.surName = this.father.split(" ")[1]
    //         return `Your child surname is ${this.child.surName}`
    //     } else {
    //         return "Your father does'nt have a surname"
    //     }
    // }

    set father(name) {
        // console.log(name)
        if (name.includes(" ")) {
            this._father = name
        }
    }

    get father() {

        return this._father
    }
    static hi() {
        return "say hi"
    }

}

const myParents = new Parents("Ammi", "Sikandar")

// console.log(myParents)

// myParents.giveBirth("Ali Hassan")

// myParents.fullName = "Sikander hasnain"



// console.log(myParents)

// Parents.prototype.giveBirth()



// //////////////////////////////////////////////////////
// Getters and Setters

const account = {
    name: "jonas",
    movements: [100, 344, 12, 232, 23, 44, 300, 10, 12],
    get latest() {
        return this.movements.slice(-1).pop();
    }
    ,
    set latest(mov) {
        this.movements.push(mov)
    }
}

// console.log(account.latest)

account.latest = 43;
// console.log(account.movements)

// Static methods

// console.log(Array.from(document.querySelectorAll("h1")))

// Parents.bye = function () {
//     return "say bye bye !!!"
// }
// console.log(Parents.bye())

////////////////////////////////////////////////////////////
// Object.create()

// const PersonProto = {
//     calcAge() {
//         return 2000 - this.birthYear
//     },

//     init(name, birthYear) {
//         this.name = name
//         this.birthYear = birthYear




//     }


// }


// console.log(PersonProto)
// const usama = Object.create(PersonProto)
// // usama.name = "Usama Ashfaq"
// // usama.age = 23

// const person = function (name, birthYear) {
//     this.name = name
//     this.birthYear = birthYear


// }


// usama.init("usama", 21)

// console.log(usama)


// ////////////////////////////////////////////////////////////////
// Coding Challenge #2

// class Car {
//     constructor(make, speed) {
//         this.make = make
//         this.speed = speed
//     }
//     accelerate() {
//         return this.speed += 10
//     }
//     brake() {
//         return speed -= 5
//     }

//     get speedUS() {
//         return this.speed / 1.6
//     }

//     set speedUS(speed) {
//         this.speed = speed * 1.6
//     }

// }

// const Ford = new Car("Ford ", 120)
// Ford.brake
// Ford.speed = 199

// console.log(Ford.speedUS)

var book = {
    year: 2004,
    edition: 1,
    get newYear() {
        return "Hello, it's " + this.year;
    },
    set newYear(y) {
        this.year = y;
    },
    set newEdition(e) {
        this.edition = e
    }

};
book.newYear = 3232
book.edition = 3
// console.log(book)

// const obj = {
//     fun() {
//         console.log("some thing")
//     },
//     name: "Hasnain",
//     job: " Doctor"
// }

// var sun = "sun"
// function fun() {
//     console.log(this.sun)
//     console.log(this)
// }

// document.querySelectorAll("div")
//     .forEach(el =>
//         console.log(el.id))
// const someObj = { a: "a", b: "b", c: "c" }

// someObj.a
// var a;
// function f1() {
//     var a = 3
//     console.log(a)
// }

// function f2() {
//     console.log(a)
// }
// f1()
// f2()

function Person(firstName, birthYear) {
    this.firstName = firstName
    this.birthYear = birthYear
}

Person.prototype.calcAge = function () {
    return 2022 - this.birthYear
}

const Student = function Student(firstName, birthYear, course) {
    Person.call(this, firstName, birthYear)
    this.course = course

}

Student.prototype = Object.create(Person.prototype)
Student.prototype.constructor = Student
const Mile = new Student("Mike", 1999, "JavaScript")
Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`)
}
console.log(Mile)

Mile.introduce()
///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definition of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// function Car(make, speed) {
//     this.make = make
//     this.speed = speed
// }

// Car.prototype.accelerate = function () {

//     this.speed += 10
//     console.log(`%c Tesla going at ${this.speed}, with a charge of ${this.battery}`, " background-color:'yellow'; ")


// }

// Car.prototype.brake = function () {

//     this.speed -= 20
//     console.log(`%c Tesla going at ${this.speed}, with a charge of ${this.battery}`, " background-color:black ; color: white;")
// }

// function EV(make, speed, battery) {
//     // this.make = make
//     // this.speed = speed
//     Car.call(this, make, speed)
//     this.battery = battery
// }


// EV.prototype = Object.create(Car.prototype)
// EV.prototype.constructor = EV


// EV.prototype.chargeBattery = function (chargeTo) {
//     this.battery = chargeTo

// }
// EV.prototype.accelerate = function () {
//     this.speed += 20
//     this.battery -= 1
//     console.log(`%c ${this.make} going at ${this.speed}, with a charge of ${this.battery}`, " background-color:'yellow'; ")


// }


// console.log(EV.prototype)


// class Car {
//     constructor(make, speed) {
//         this.make = make
//         this.speed = speed

//     }
//     accelerate() {
//         this.speed += 10
//         console.log(`%c Tesla going at ${this.speed}, with a charge of ${this.battery}`, " background-color:'yellow'; ")
//     }

//     brake() {

//         this.speed -= 20
//         console.log(`%c ${this.make} going at ${this.speed}, with a charge of ${this.battery} `, " background-color:black ; color: white;")
//     }

// }

// class EV extends Car {
//     constructor(make, speed, battery) {
//         // this.make = make
//         // this.speed = speed

//         super(make, speed)
//         this.battery = battery

//     }
//     accelerate() {
//         this.speed += 10
//         this.battery -= 1
//         console.log(`%c ${this.make} going at ${this.speed}, with a charge of ${this.battery} `, " background-color:'yellow'; ")
//     }

//     chargeBattery(chargeTo) {
//         this.battery = chargeTo


//     }
// }

// const Tesla = new EV('Tesla', 120, 90)

// Tesla.chargeBattery(100)
// console.log(Tesla)
// Tesla.accelerate()
// Tesla.brake()
// Tesla.brake()

// Tesla.brake()
// Object.create()

const PersonProto = {
    calcAge() {
        return 2020 - this.birthYear
    },
    init(name, birthYear) {
        this.name = name
        this.birthYear = birthYear

        this.age = this.calcAge()
    }
}


console.log(PersonProto)
const Ahmad = Object.create(PersonProto)
const Ashfaq = Object.create(Ahmad)
const usama = Object.create(Ashfaq)
// usama.name = "Usama Ashfaq"
// usama.age = 23

usama.init = function (name, birthYear, information) {
    // this.name = name
    // this.birthYear = birthYear

    PersonProto.init.call(this, name, birthYear)


    this.information = information

}
Ashfaq.init = function (name, birthYear, diploma) {
    // this.name = name
    // this.birthYear = birthYear

    PersonProto.init.call(this, name, birthYear)


    this.diploma = diploma

}
Ahmad.init = function (name, birthYear, zameen) {
    // this.name = name
    // this.birthYear = birthYear

    PersonProto.init.call(this, name, birthYear)


    this.zameen = zameen

}

usama.init("Usama", 1998, " computer and Technology")
Ashfaq.init("Ashfaq", 1947, "Chemical Analysis")
Ahmad.init("Ahmad", 1876, "500 Murabba Miles")

console.log(usama)
// console.log(Ashfaq)
// console.log(Ahmad)
class Account {
    // Public Fields (instances)
    // locale = window.navigator.language;

    // Private Fields
    #pin;
    #movements = [];


    constructor(owner, currency, pin) {
        this.owner = owner
        this.currency = currency
        this.#pin = pin
        // this._movements = []
        // this.locale = window.navigator.language
    }

    deposit(val) {
        this.#movements.push(val)
        return this
    }
    withdraw(val) {
        this.#movements.push(-val)
        return this
    }
    getMovements() {
        return this.#movements
    }
}

const acc1 = new Account("Hasnain", "PKR", "5566")


acc1.deposit(323)
acc1.withdraw(23)




// chaining methods
acc1.deposit(212).withdraw(232)

console.log(acc1.getMovements())




// //////////////////////////////////////////////////////////////
// Coding Challenge 4


class Car {
    constructor(make, speed) {
        this.make = make
        this.speed = speed

    }
    accelerate() {
        this.speed += 10
        console.log(`%c Tesla going at ${this.speed}, with a charge of ${this._battery}`, " background-color:'yellow'; ")
        return this
    }

    brake() {

        this.speed -= 20
        console.log(`%c ${this.make} decelerated at ${this.speed}, with a charge of ${this._battery} `, " background-color:black ; color: white;")

        return this
    }

}

class EV extends Car {


    constructor(make, speed, battery) {
        // this.make = make
        // this.speed = speed

        super(make, speed)
        this._battery = battery

    }
    accelerate() {
        this.speed += 10
        this._battery -= 1
        console.log(`%c ${this.make} acclerated at ${this.speed}, with a charge of ${this._battery} `, " background-color:'yellow'; ")

        return this
    }

    chargeBattery(chargeTo) {
        this._battery = chargeTo


    }
}

const Tesla = new EV('Tesla', 120, 90)

Tesla.chargeBattery(100)
console.log(Tesla)
Tesla.brake().accelerate().accelerate().brake()

// Tesla.brake()
// Object.create()


