'use strict';

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(".btn--scroll-to")
const section1 = document.querySelector("#section--1")

const tabs = document.querySelectorAll(".operations__tab")
const tabsContainer = document.querySelector(".operations__tab-container")
const tabsContent = document.querySelectorAll(".operations__content")

const nav = document.querySelector(".nav")

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(el => el.addEventListener('click', openModal))
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i]);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});




btnScrollTo.addEventListener("click", function (e) {
  const s1cords = section1.getBoundingClientRect()
  console.log(s1cords)

  // console.log(e.target.getBoundingClientRect())
  console.log("scroll (X/Y): ", window.pageXOffset, window.scrollY)

  // console.log("hight/width:",
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // )

  // window.scrollTo(s1cords.left + window.scrollX, s1cords.top + window.scrollY)
  // window.scrollTo({
  //   lett: s1cords.left + window.scrollX,
  //   top: s1cords.top + window.scrollY,
  //   behavior: "smooth"
  // })

  section1.scrollIntoView({ behavior: "smooth" })

}
)

// document.querySelectorAll(".nav__link").forEach
//   (function (el) {
//     el.addEventListener("click", function (e) {
//       e.preventDefault()
//       const id = this.getAttribute("href")
//       document.querySelector(id).scrollIntoView({ behavior: "smooth" })
//     })
//   })


// Event Delegation
// 1 Add event listener to the common parent element
// 2 Determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {

  // Matching Strategy
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault()
    const id = e.target.getAttribute("href")
    document.querySelector(id).scrollIntoView({ behavior: "smooth" })
  }
})
///////////////////////////////////////
// Dom Traversing

// const h1 = document.querySelector("h1")

// console.log(h1.childNodes)
// console.log(h1.firstElementChild)
// console.log(h1.querySelectorAll(".highlight"))


// Moving upward
// console.log(h1.parentElement)
// console.log(h1.parentNode)
// h1.closest(".header").style.background = 'var(--color-secondary)'
// h1.closest("h1").style.background = 'var(--color-primary)'


// // Siblings

// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)
// console.log(h1.previousSibling)
// console.log(h1.nextSibling)

// console.log(h1.parentElement.children)


// [...h1.parentElement.children].forEach(el =>if (el != h1) el.style.transform = "scale(0.5)")


tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab")
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove("operations__tab--active"))
  tabsContent.forEach(c => c.classList.remove("operations__content--active"))


  clicked.classList.add("operations__tab--active")

  // Activate content area
  document
    .querySelector
    (`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  console.log(clicked)

})
function handleHover(e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(el => {
      if (el !== link)
        el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
}
nav.addEventListener("mouseover", handleHover.bind(0.5))


nav.addEventListener("mouseout", handleHover.bind(1))


// sticky navbar
const initialCords = section1.getBoundingClientRect()

// window.addEventListener("scroll", function () {
//   console.log(window.scrollY)
//   if (this.window.scrollY > initialCords.top) {
//     nav.classList.add("sticky")
//   } else
//     (nav.classList.remove("sticky"))

// })


// intersectionApi
// const obsCallBack = function (entries, observer) {
//   entries.forEach(e => {
//     e.intersectionRatio >= 0.25 && nav.classList.add("sticky")
//     console.log("the element has pass ", e.intersectionRatio.toFixed(2))

//   })
// }

// const obsOptions = { root: null, threshold: 0.25 }
// const observer = new IntersectionObserver(obsCallBack, obsOptions)

// observer.observe(section1)


const headerCallBack = function (entries) {
  const [entry] = entries;
  !entry.isIntersecting ? nav.classList.add("sticky") : nav.classList.remove("sticky")



}
const navHeight = nav.getBoundingClientRect().height
const headerObserver = new IntersectionObserver(headerCallBack, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`


})

const header = document.querySelector(".header")
headerObserver.observe(header)


// revealing section as we scroll

const sectionCallBack = (entries, observer) => {
  entries.forEach(entry => {

    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden")
    sectionObserver.unobserve(entry.target)
  }

  )
}
const sectionObserver = new IntersectionObserver(sectionCallBack, {
  root: null,
  threshold: 0.15,
})
const allSections = document.querySelectorAll("section")

allSections.forEach((section) => {

  sectionObserver.observe(section)
  section.classList.add("section--hidden")
})


// Image Lazy Loading

const imgCallBack = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener("load", () => {


    entry.target.classList.remove("lazy-img")
  })
  imageObserver.unobserve(entry.target)


}
const imageObserver = new IntersectionObserver(imgCallBack, { root: null, threshold: 0, rootMargin: "200px" })
const allImages = document.querySelectorAll("img[data-src]")
allImages.forEach(img => imageObserver.observe(img))
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Slider
const dots = document.querySelector(".dots")
const slides = document.querySelectorAll(".slide-1")
const btnRight = document.querySelector(".slider__btn--right")
const btnLeft = document.querySelector(".slider__btn--left")


const dots2 = document.querySelector(".dots-2")
const slides2 = document.querySelectorAll(".slide-2")
const btnRight2 = document.querySelector(".slider__btn--right-2")
const btnLeft2 = document.querySelector(".slider__btn--left-2")

const slider = function (slides, dots, btnRight, btnLeft) {
  const maxSlides = slides.length
  let curSlide = 0;

  // functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dots.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
  }

  const activateDot = function (slide) {
    document.querySelectorAll(".dots__dot").forEach(dot => {
      dot.classList.remove("dots__dot--active")
    })
    document.querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active")
  }
  const nextSlide = function () {

    if (curSlide === maxSlides - 1) {
      curSlide = 0
    } else {
      curSlide++

    }
    goToSlide(curSlide);
    activateDot(curSlide)
    console.log(curSlide)
  }

  const prevSlide = function () {

    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide--;
    }
    console.log(curSlide)
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  const init = function () {
    goToSlide(0)
    createDots()
    activateDot(0)
  }
  init()





  // Event Listeners
  btnRight.addEventListener("click", nextSlide)
  btnLeft.addEventListener("click", prevSlide)
  document.addEventListener("keydown", function (e) {
    e.key === "ArrowLeft" && nextSlide()
    e.key === "ArrowRight" && prevSlide()

    console.log(e)
  })


  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset
      goToSlide(slide)
      activateDot(slide)
    }

  })


}
slider(slides, dots, btnRight, btnLeft)
slider(slides2, dots2, btnRight2, btnLeft2)



  /////////////////////////
  //////////////
  ///////////////////////////////////////
  ///////////////////////////////////////
  ///////////////////////////////////////
  +
  // Selecting HTML elements

  // const header = document.querySelector("header")
  // document.querySelectorAll(".header")
  // document.getElementById("section--1")
  // document.getElementsByTagName("button")
  // document.getElementsByClassName("section")


  // const el = document.createElement("div")
  // el.classList.add("cookie-message")
  // el.innerHTML =
  //   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

  // header.prepend(el)

  // header.insertAdjacentElement("afterbegin", el)
  // header.append(el)
  // header.append(el.cloneNode(true))
  // header.before(el)
  // header.after(el)


  // document.querySelector(".btn--close-cookie").addEventListener("click", function () {
  //   // el.remove() 
  //   el.parentElement.removeChild(el)
  // })
  // console.log(el)


  // console.log(getComputedStyle(el).color)

  // document.documentElement.style.setProperty("--color-primary", "blue")

  // const logo = document.querySelector(".nav__logo")
  // console.log(logo.getAttribute("designer"))
  // console.log(logo.getAttribute("designer"))

  // logo.alt = "Beautiful minimalist logo"
  // logo.setAttribute("company", "Banksia")


  // console.log(logo.src)
  // console.log(logo.getAttribute("src"))

  // console.log(logo.dataset.versionNumber)

  // logo.classList.add("c", "j", "d")
  // logo.classList.remove("c", "j")
  // logo.classList.toggle("c")
  // logo.classList.contains("c")

  // Do not use this
  // logo.className = "something"

  // const h1 = document.querySelector("h1")

  // const alertH1 = (e) => {
  //   alert("you have entered ")
  // }

  // h1.addEventListener("mouseenter", alertH1)

  // setTimeout(() => {
  //   h1.removeEventListener("mouseenter", alertH1)

  // }, 5000)




  // // Creating and inserting elements
  // const message = document.createElement('div');
  // message.classList.add('cookie-message');
  // // message.textContent = 'We use cookied for improved functionality and analytics.';
  // message.innerHTML =
  //   'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';





  // header.prepend(message);
  // header.append(message);
  // header.append(message.cloneNode(true));

  // header.before(message);
  // header.after(message);

  // Delete elements
  // document
  //   .querySelector('.btn--close-cookie')
  //   .addEventListener('click', function () {
  //     // message.remove();
  //     message.parentElement.removeChild(message);
  //   });



  ///////////////////////////////////////////////


  // const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)




  // const randColor = () => `rgb(${randInt(0, 255)},${randInt(0, 255)},${randInt(0, 255)})`;


  // console.log(randInt(0, 255))

  // document.querySelector(".nav__link").addEventListener("click", function (e) {
  //   console.log("Nav link")
  //   this.style.backgroundColor = randColor()
  //   e.stopPropagation()
  // })
  // document.querySelector(".nav").addEventListener("click", function (e) {
  //   console.log("Nav link")
  //   this.style.backgroundColor = randColor()
  //   e.stopPropagation()
  // })
  // document.querySelector(".nav__links").addEventListener("click", function (e) {
  //   console.log("Nav link")
  //   this.style.backgroundColor = randColor()

  //   // stop propagation
  //   e.stopPropagation()
  // })

  // window.addEventListener("beforeunload", function (e) {
  //   e.preventDefault();
  //   e.returnValue = ""
  // })

  // document.addEventListener("DOMContentLoaded", (e) => console.log(e))
  document.addEventListener("load", e => console.log(e))