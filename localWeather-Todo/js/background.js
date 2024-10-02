const body = document.querySelector("body");

const backImg = [
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/04/11/16/04/solar-wind-7917660_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/08/58/astronomy-1868560_1280.jpg",
  "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2170473/pexels-photo-2170473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
]

function backgroundRandomImage() {
  const arrRandomIndex = Math.floor(Math.random() * backImg.length);
  const selectBackImg = backImg[arrRandomIndex]
  body.style.backgroundImage = `url(${selectBackImg})`
}

backgroundRandomImage();