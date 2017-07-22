
  // Initialize Menu
  Menu.init()

  // Initialize Rooms
  Rooms.init()

  // Initialize Gallery
  Gallery.init()


  // Initialize Reserve
  Reserve.init()

  // Jump to the sections plus the height of the menubar
  // TODO Fix where to jump
  window.addEventListener("hashchange", function () {
      window.scrollTo(window.scrollX, window.scrollY - navList.clientHeight + 1);
  });

// CLOSING TAG OF init() (Begins in 1-global-vars.js)
}
