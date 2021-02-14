{
  let mouse = { x: 0, y: 0 }; //Cursor position
  let pos = { x: 0, y: 0 }; //Cursor position
  let ratio = 0.05; //delay follow cursor
  let active = false;
  let ball = document.getElementById("ball");

  TweenLite.set(ball, { xPercent: -50, yPercent: -50 }); //scale from middle ball

  document.addEventListener("mousemove", mouseMove);

  function mouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
  }

  TweenLite.ticker.addEventListener("tick", updatePosition);

  function updatePosition() {
      if (!active) {
          pos.x += (mouse.x - pos.x) * ratio;
          pos.y += (mouse.y - pos.y) * ratio;

          TweenLite.set(ball, { x: pos.x, y: pos.y });
      }
  }



  $(".contact-area").mouseenter(function (e) {
      TweenMax.to(this, 0.3, { scale: 1.05 }); //scale trigger element
      TweenMax.to(ball, 0.3, { scale: 3.3 }); //scale ball
      TweenMax.to(ball, 0.3, { borderWidth: '.5px' });
      active = true;
  });

  $(".contact-area").mouseleave(function (e) {
      TweenMax.to(this, 0.3, { scale: 1 });
      TweenMax.to(ball, 0.3, { scale: 1 });
      TweenMax.to(this.querySelector(".text-hover"), 0.3, { x: 0, y: 0 });
      TweenMax.to(ball, 0.3, { borderWidth: '1px' });
      active = false;
  });

  $(".contact-area").mousemove(function (e) {
      parallaxCursor(e, this, 1); //magnetic ball = low number is more attractive
      callParallax(e, this);
  });

  function callParallax(e, parent) {
      parallaxIt(e, parent, parent.querySelector(".text-hover"), 85); //magnetic area = higher number is more attractive
  }

  function parallaxIt(e, parent, target, movement) {
      let boundingRect = parent.getBoundingClientRect();
      let relX = e.clientX - boundingRect.left;
      let relY = e.clientY - boundingRect.top;

      TweenMax.to(target, 0.3, {
          x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
          y: (relY - boundingRect.height / 2) / boundingRect.height * movement,
          ease: Power2.easeOut
      });
  }

  function parallaxCursor(e, parent, movement) {
      let rect = parent.getBoundingClientRect();
      let relX = e.clientX - rect.left;
      let relY = e.clientY - rect.top;
      pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
      pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
      TweenMax.to(ball, 0.3, { x: pos.x, y: pos.y });
  }

}