(function(){
  // Barra de progreso
  var bar = document.createElement('div');
  bar.className = 'progress-bar';
  document.body.appendChild(bar);

  // Pantalla de transición
  var overlay = document.createElement('div');
  overlay.className = 'page-transition';
  document.body.appendChild(overlay);

  // Entrada — exit animation on load
  overlay.classList.add('exit');
  overlay.addEventListener('animationend', function(){
    overlay.classList.remove('exit');
    overlay.style.transform = 'translateY(100%)';
  },{once:true});

  // Click en enlaces internos
  document.addEventListener('click', function(e){
    var link = e.target.closest('a[href]');
    if(!link) return;
    var href = link.getAttribute('href');
    if(!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || link.getAttribute('target') === '_blank' || link.hasAttribute('download')) return;

    e.preventDefault();

    // Barra de progreso
    bar.style.width = '60%';

    // Overlay entra
    overlay.style.transform = '';
    overlay.classList.add('enter');
    overlay.addEventListener('animationend', function(){
      bar.style.width = '100%';
      setTimeout(function(){ window.location.href = href; }, 80);
    },{once:true});
  });

  // Nav scroll (solo si existe nav con id nav)
  var nav = document.getElementById('nav');
  if(nav){
    window.addEventListener('scroll',function(){
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // Burger
  var burger = document.getElementById('burger');
  var mobileNav = document.getElementById('nav-mobile');
  if(burger && mobileNav){
    burger.addEventListener('click',function(){
      mobileNav.classList.toggle('open');
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if(reveals.length){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting) e.target.classList.add('on');});
    },{threshold:.1});
    reveals.forEach(function(el){obs.observe(el);});
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click',function(){
      var item = btn.parentElement;
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('open');});
      if(!isOpen) item.classList.add('open');
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
})();
