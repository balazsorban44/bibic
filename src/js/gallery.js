const pswpElement = document.querySelectorAll('.pswp')[0];
const rootDir = 'assets/images/gallery/';
// build items array
let items = [];
for (let i = 0; i < 30; i++) {
  items.push({
    src: `${rootDir}${i}.jpg`,
    w: 2560,
    h: 1707
  })
}

const options = {
  history: false,
  loop: false,
  spacing: 0.01,
  modal: false,
  pinchToClose: false,
  closeOnScroll: false,
  closeOnVerticalDrag: false,
  escKey: false,
  closeEl: false,
  captionEl: false,
  zoomEl: false,
  shareEl: false,
  counterEl: false,
  focus: false,
  maxSpreadZoom: 1
}

const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options)

gallery.init()
