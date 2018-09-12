const sliderData = [
    {
        content: `<img class='photo' src='http://pm1.narvii.com/6325/420ff8c18c3f8b16413ada8bc5f1bc44626acd67_00.jpg'>`
    },
    {
        content: `<img class='photo' src='https://vignette.wikia.nocookie.net/motu-patlu/images/7/78/Motu_dab.png/revision/latest/zoom-crop/width/320/height/320?cb=20171221221904'>`
    },
    {
        content: `<img class='photo' src='https://ih1.redbubble.net/image.424670743.9643/flat,550x550,075,f.u1.jpg'>`
    }
];

for (let i = 0; i < sliderData.length; i++) {
  const slider = document.querySelector(".slider");
  const {content} = sliderData[i];
  const slideData = `
    <div class="slide ${i == 0 ? 'visible' : ''}" data-slide="slide-${i}">
      ${content}
    </div>
  `;
  slider.innerHTML += slideData;
}

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
const slideInterval = setInterval(() => {
  slides[currentSlide].classList.remove("visible");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("visible");
}, 5000);
