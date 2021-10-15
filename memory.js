var clicks;

var imgEls = document
  .querySelector("#board")
  .querySelectorAll(".card .back img");
var cards = document.querySelector("#board").querySelectorAll(".card");

var images = [];

function startGame() {
  clicks = 0;
  for (i = 1; i <= 6; i++) {
    images.push(i);
    images.push(i);
  }

  images = images.map((c) => {
    //c=images[i] , i=0:12
    //console.log("c:", c);
    return "memory-photos/" + c + ".jpg";
  });

  let size = imgEls.length;
  for (i = 0; i < size; i++) {
    let rnd = Math.floor(Math.random() * images.length);
    imgEls[i].setAttribute("src", images[rnd]);
    images.splice(rnd, 1);
  }
}

cards.forEach(function (item, index) {
  item.addEventListener("click", function () {
    if (!item.classList.contains("OK")) {
      clicks++;
      if (clicks == 1) d1 = new Date();

      item.classList.toggle("clicked");

      let clickedCards = document
        .querySelector("#board")
        .querySelectorAll(".card.clicked");

      if (clickedCards.length > 2) {
        for (i = 0; i < clickedCards.length; i++)
          clickedCards[i].classList.remove("clicked");
        item.classList.add("clicked");
      }

      if (clickedCards.length == 2) {
        if (
          clickedCards[0].querySelector(".back img").getAttribute("src") ==
          clickedCards[1].querySelector(".back img").getAttribute("src")
        ) {
          clickedCards[0].classList.remove("clicked");
          clickedCards[1].classList.remove("clicked");
          clickedCards[0].classList.add("OK");
          clickedCards[1].classList.add("OK");
        }
      }
      var OKCards = document
        .querySelector("#board")
        .querySelectorAll(".card.OK");
      if (OKCards.length == imgEls.length) {
        d2 = new Date();
        setTimeout(function () {
          alert(
            "YOU DID IT!! You finished in: " +
              Math.floor((d2 - d1) / 1000) +
              " seconds. Number of clicks: " +
              clicks +
              "!"
          );
          OKCards.forEach(function (item, index) {
            item.classList.remove("OK");
          });

          startGame();
        }, 500);
      }
    }
  });
});

startGame();
