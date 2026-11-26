(() => {
  'use strict';
  const data = window.PORTFOLIO;
  if (!data) return;
  const $ = selector => document.querySelector(selector);
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const allWorks = [...data.works, ...data.company, ...data.personal];
  const byKey = new Map(allWorks.map(work => [work.key, work]));
  const videoUrl = work => work.youtube ? `https://www.youtube.com/watch?v=${work.youtube}` : work.video;

  function card(work) {
    return `<article class="work-card" data-category="${escape(work.category)}"><a class="work-image" data-work="${escape(work.key)}" href="${escape(videoUrl(work))}" aria-label="${escape(work.title)} 재생"><img src="${escape(work.thumbnail)}" alt="${escape(work.title)} 썸네일" loading="lazy" width="1280" height="720"><span class="play-button" aria-hidden="true"></span><span class="duration">${escape(work.duration)}</span></a><div class="work-info"><div class="work-subline"><span class="work-category">${escape(work.label)}</span>${work.date ? `<time datetime="${escape(work.date.replaceAll('.','-'))}">${escape(work.date)}</time>` : (work.period ? `<span class="work-archive-period">${escape(work.period)}</span>` : '')}</div><h3><a data-work="${escape(work.key)}" href="${escape(videoUrl(work))}">${escape(work.title)}</a></h3><p class="work-series">${escape(work.series)}</p>${work.productionPeriod ? `<p class="work-production">제작기간 ${escape(work.productionPeriod)}</p>` : ''}</div></article>`;
  }
  $('#works-grid').innerHTML = data.works.filter(work => work.category !== 'debut').map(card).join('');
  $('#company-grid').innerHTML = data.company.map(card).join('');
  $('#personal-grid').innerHTML = data.personal.map(card).join('');
  $('.archive-count').textContent = data.company.length + data.personal.length;
  $('#copyright-year').textContent = new Date().getFullYear();

  const filters = [...document.querySelectorAll('[data-filter]')];
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    $('#featured-work').hidden = !['all','debut'].includes(category);
    const cards = [...$('#works-grid').children];
    cards.forEach(el => { el.hidden = category !== 'all' && el.dataset.category !== category; });
    const visible = cards.filter(el => !el.hidden).length;
    $('#works-grid').hidden = visible === 0;
    $('[data-filter-status]').textContent = `작업물 ${visible + Number(!$('#featured-work').hidden)}개`;
  }));

  // A single prepared video repeats natively without reloading its source.
  const heroVideo = $('.hero-video');
  const toggle = $('.motion-toggle');
  let manuallyPaused = motion.matches;
  let heroBlocked = false;
  const canPlayHero = () => !manuallyPaused && !heroBlocked && !document.hidden;

  function updateMotionButton() {
    toggle.setAttribute('aria-pressed', String(manuallyPaused));
    toggle.setAttribute('aria-label', manuallyPaused ? '배너 영상 재생' : '배너 영상 일시정지');
    toggle.firstElementChild.textContent = manuallyPaused ? '▶' : 'Ⅱ';
  }
  function syncHero() {
    if (canPlayHero()) heroVideo.play().catch(() => {
      manuallyPaused = true;
      updateMotionButton();
    });
    else heroVideo.pause();
  }
  toggle.addEventListener('click', () => {
    manuallyPaused = !manuallyPaused;
    updateMotionButton();
    syncHero();
  });
  motion.addEventListener('change', event => {
    if (event.matches) { manuallyPaused = true; updateMotionButton(); syncHero(); finishIntro(); }
  });
  document.addEventListener('visibilitychange',syncHero);
  updateMotionButton();
  syncHero();

  const dialog = $('#project-dialog');
  const player = $('#dialog-player');
  let opener = null;
  function meta(label,value) {
    if (!value || (Array.isArray(value) && !value.length)) return '';
    return `<div><dt>${escape(label)}</dt><dd>${escape(Array.isArray(value) ? value.join(' · ') : value)}</dd></div>`;
  }
  function openWork(work,trigger) {
    if (!dialog.showModal) { location.href = videoUrl(work); return; }
    if (dialog.open) return;
    opener = trigger;
    $('#project-title').textContent = work.title;
    $('#project-category').textContent = work.series;
    $('#project-description').textContent = work.description;
    $('#project-metadata').innerHTML = meta('공개일',work.date) + meta('작업 시기',work.period) + meta('담당',work.role) + meta('영상 길이',work.duration) + meta('제작일',work.productionDate) + meta('제작기간',work.productionPeriod) + meta('사용 프로그램',work.software);
    player.replaceChildren();
    const ytLink = $('#youtube-link');
    ytLink.hidden = !work.youtube;
    $('#player-note').hidden = !work.youtube;
    if (work.youtube) {
      ytLink.href = videoUrl(work);
      if (['http:','https:'].includes(location.protocol)) {
        const frame = document.createElement('iframe');
        frame.src = `https://www.youtube-nocookie.com/embed/${work.youtube}?autoplay=1&rel=0&playsinline=1`;
        frame.title = `${work.title} YouTube 재생`;
        frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        frame.allowFullscreen = true;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        player.append(frame);
      } else {
        const image = document.createElement('img');
        image.src = work.thumbnail;
        image.alt = work.title;
        const link = document.createElement('a');
        link.href = videoUrl(work);
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'file-player-link';
        link.innerHTML = '<span>YouTube에서 재생</span>';
        player.append(image,link);
        $('#player-note').textContent = 'YouTube에서 공개 영상을 감상하세요.';
      }
    } else {
      const video = document.createElement('video');
      video.src = work.video;
      video.poster = work.thumbnail;
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      player.append(video);
      video.play().catch(() => {});
    }
    heroBlocked = true;
    syncHero();
    dialog.showModal();
    document.body.classList.add('modal-open');
    $('.dialog-close').focus({preventScroll:true});
  }
  document.addEventListener('click',event => {
    const trigger = event.target.closest('[data-work]');
    if (!trigger || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const work = byKey.get(trigger.dataset.work);
    if (!work) return;
    event.preventDefault();
    $('#player-note').textContent = '재생이 제한되면 YouTube에서 시청할 수 있습니다.';
    openWork(work,trigger);
  });
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    player.querySelector('video')?.pause();
    player.replaceChildren();
    document.body.classList.remove('modal-open');
    heroBlocked = false;
    syncHero();
    opener?.focus({preventScroll:true});
    opener = null;
  });

  // Footer easter egg: choose one image, fade it away, then return to the top.
  const flashTrigger = $('.footer-easter-egg');
  const flash = $('#thumbnail-flash');
  const flashImage = flash.querySelector('img');
  const flashThumbnails = [
    {src:'assets/april-fools-thumbnail.png',alt:'양우혁이 제작한 스텔라이브 만우절 특집 썸네일 · 밈'},
    {src:'assets/april-fools-kang.png',alt:'양우혁이 제작한 스텔라이브 만우절 특집 썸네일 · 캥'},
  ];
  let flashTimer, flashFadeTimer, flashLoading = false;
  function fadeFlash() {
    if (!flash.open || flash.classList.contains('is-leaving')) return;
    clearTimeout(flashTimer);
    flash.classList.add('is-leaving');
    if (motion.matches) { flash.close(); return; }
    flashFadeTimer = setTimeout(() => { if (flash.open) flash.close(); },510);
  }
  flashTrigger.addEventListener('click', async () => {
    if (!flash.showModal || flash.open || flashLoading) return;
    flashLoading = true;
    const thumbnail = flashThumbnails[Math.floor(Math.random() * flashThumbnails.length)];
    flashImage.src = thumbnail.src;
    flashImage.alt = thumbnail.alt;
    try { await flashImage.decode(); } catch { return; }
    finally { flashLoading = false; }
    if (flash.open) return;
    flash.classList.remove('is-leaving');
    heroBlocked = true;
    syncHero();
    window.scrollTo({top:0,left:0,behavior:'instant'});
    $('.masthead .wordmark').focus({preventScroll:true});
    try { history.replaceState(null,'','#top'); } catch {}
    flash.showModal();
    document.body.classList.add('modal-open');
    $('.thumbnail-flash-close').focus({preventScroll:true});
    flashTimer = setTimeout(fadeFlash,2000);
  });
  $('.thumbnail-flash-close').addEventListener('click',fadeFlash);
  flash.addEventListener('cancel', event => {
    event.preventDefault();
    fadeFlash();
  });
  flash.addEventListener('transitionend', event => {
    if (event.target === flash && event.propertyName === 'opacity'
      && flash.classList.contains('is-leaving') && flash.open) flash.close();
  });
  flash.addEventListener('close', () => {
    clearTimeout(flashTimer);
    clearTimeout(flashFadeTimer);
    flash.classList.remove('is-leaving');
    document.body.classList.remove('modal-open');
    heroBlocked = false;
    syncHero();
    window.scrollTo({top:0,left:0,behavior:'instant'});
    $('.masthead .wordmark').focus({preventScroll:true});
    try { history.replaceState(null,'','#top'); } catch {}
  });

  // A brief, skippable logo animation is shown once per browser session.
  const intro = $('#intro-screen');
  let introTimer, leavingTimer, introOpener;
  function finishIntro() {
    clearTimeout(introTimer);
    clearTimeout(leavingTimer);
    if (intro.hidden) return;
    intro.hidden = true;
    intro.classList.remove('is-leaving');
    $('.masthead').inert = false;
    $('main').inert = false;
    (introOpener || $('.masthead .wordmark')).focus({preventScroll:true});
    introOpener = null;
  }
  function showIntro(trigger) {
    if (motion.matches || !intro.hidden) return;
    introOpener = trigger || null;
    intro.hidden = false;
    $('.masthead').inert = true;
    $('main').inert = true;
    $('.intro-skip').focus({preventScroll:true});
    introTimer = setTimeout(() => {
      intro.classList.add('is-leaving');
      leavingTimer = setTimeout(finishIntro,470);
    },1650);
  }
  $('.intro-skip').addEventListener('click', () => {
    const first = introOpener || $('.masthead .wordmark');
    finishIntro();
    first.focus({preventScroll:true});
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !intro.hidden) { event.preventDefault(); finishIntro(); }
  });
  $('.replay-intro').addEventListener('click',event => showIntro(event.currentTarget));
  try {
    const key = 'woohyuk-channel-intro-v1';
    if (!sessionStorage.getItem(key) && !location.hash) {
      sessionStorage.setItem(key,'seen');
      showIntro();
    }
  } catch { showIntro(); }

  const sectionLinks = [...document.querySelectorAll('.channel-tabs a')];
  let sectionFrame = 0;
  function updateSection() {
    sectionFrame = 0;
    const threshold = innerHeight * .4;
    let active = 'works';
    ['works','archive','about'].forEach(id => {
      if (document.getElementById(id).getBoundingClientRect().top <= threshold) active = id;
    });
    sectionLinks.forEach(link => {
      if (link.hash === `#${active}`) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', () => {
    if (!sectionFrame) sectionFrame = requestAnimationFrame(updateSection);
  },{passive:true});
  updateSection();
})();
