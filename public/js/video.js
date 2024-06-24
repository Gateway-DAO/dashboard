!(function () {
  const e = function (e) {
      const t = e.querySelector('.kg-audio-player-container'),
        a = e.querySelector('.kg-audio-play-icon'),
        i = e.querySelector('.kg-audio-pause-icon'),
        o = e.querySelector('.kg-audio-seek-slider'),
        d = e.querySelector('.kg-audio-playback-rate'),
        r = e.querySelector('.kg-audio-mute-icon'),
        s = e.querySelector('.kg-audio-unmute-icon'),
        l = e.querySelector('.kg-audio-volume-slider'),
        n = e.querySelector('audio'),
        c = e.querySelector('.kg-audio-duration'),
        u = e.querySelector('.kg-audio-current-time');
      let g = [
          {
            rate: 0.75,
            label: '0.7×',
          },
          {
            rate: 1,
            label: '1×',
          },
          {
            rate: 1.25,
            label: '1.2×',
          },
          {
            rate: 1.75,
            label: '1.7×',
          },
          {
            rate: 2,
            label: '2×',
          },
        ],
        v = null,
        m = 1;
      const k = () => {
          (o.value = Math.floor(n.currentTime)),
            (u.textContent = h(o.value)),
            t.style.setProperty(
              '--seek-before-width',
              (o.value / o.max) * 100 + '%'
            ),
            (v = requestAnimationFrame(k));
        },
        y = (e) => {
          e === o
            ? t.style.setProperty(
                '--seek-before-width',
                (e.value / e.max) * 100 + '%'
              )
            : t.style.setProperty(
                '--volume-before-width',
                (e.value / e.max) * 100 + '%'
              );
        },
        h = (e) => {
          const t = Math.floor(e / 60),
            a = Math.floor(e % 60);
          return `${t}:${a < 10 ? `0${a}` : `${a}`}`;
        },
        p = () => {
          c.textContent = h(n.duration);
        },
        L = () => {
          o.max = Math.floor(n.duration);
        },
        f = () => {
          if (n.buffered.length > 0) {
            const e = Math.floor(n.buffered.end(n.buffered.length - 1));
            t.style.setProperty('--buffered-width', (e / o.max) * 100 + '%');
          }
        };
      n.readyState > 0
        ? (p(), L(), f())
        : n.addEventListener('loadedmetadata', () => {
            p(), L(), f();
          }),
        a.addEventListener('click', () => {
          a.classList.add('kg-audio-hide'),
            i.classList.remove('kg-audio-hide'),
            n.play(),
            requestAnimationFrame(k);
        }),
        i.addEventListener('click', () => {
          i.classList.add('kg-audio-hide'),
            a.classList.remove('kg-audio-hide'),
            n.pause(),
            cancelAnimationFrame(v);
        }),
        r.addEventListener('click', () => {
          r.classList.add('kg-audio-hide'),
            s.classList.remove('kg-audio-hide'),
            (n.muted = !1);
        }),
        s.addEventListener('click', () => {
          s.classList.add('kg-audio-hide'),
            r.classList.remove('kg-audio-hide'),
            (n.muted = !0);
        }),
        d.addEventListener('click', () => {
          let e = g[(m + 1) % 5];
          (m += 1), (n.playbackRate = e.rate), (d.textContent = e.label);
        }),
        n.addEventListener('progress', f),
        o.addEventListener('input', (e) => {
          y(e.target),
            (u.textContent = h(o.value)),
            n.paused || cancelAnimationFrame(v);
        }),
        o.addEventListener('change', () => {
          (n.currentTime = o.value), n.paused || requestAnimationFrame(k);
        }),
        l.addEventListener('input', (e) => {
          const t = e.target.value;
          y(e.target), (n.volume = t / 100);
        });
    },
    t = document.querySelectorAll('.kg-audio-card');
  for (let a = 0; a < t.length; a++) e(t[a]);
})(),
  document.querySelectorAll('.kg-gallery-image img').forEach(function (e) {
    const t = e.closest('.kg-gallery-image'),
      a = e.attributes.width.value / e.attributes.height.value;
    t.style.flex = a + ' 1 0%';
  }),
  (function () {
    const e = document.getElementsByClassName('kg-toggle-heading'),
      t = function (e) {
        const t = e.target.closest('.kg-toggle-card');
        'close' === t.getAttribute('data-kg-toggle-state')
          ? t.setAttribute('data-kg-toggle-state', 'open')
          : t.setAttribute('data-kg-toggle-state', 'close');
      };
    for (let a = 0; a < e.length; a++) e[a].addEventListener('click', t, !1);
  })(),
  (function () {
    const e = function (e) {
        const t = e.querySelector('.kg-video-player'),
          a = e.querySelector('.kg-video-player-container'),
          i = e.querySelector('.kg-video-play-icon'),
          o = e.querySelector('.kg-video-pause-icon'),
          d = e.querySelector('.kg-video-seek-slider'),
          r = e.querySelector('.kg-video-playback-rate'),
          s = e.querySelector('.kg-video-mute-icon'),
          l = e.querySelector('.kg-video-unmute-icon'),
          n = e.querySelector('.kg-video-volume-slider'),
          c = e.querySelector('video'),
          u = e.querySelector('.kg-video-duration'),
          g = e.querySelector('.kg-video-current-time'),
          v = e.querySelector('.kg-video-large-play-icon'),
          m = e.querySelector('.kg-video-overlay');
        let k = [
            {
              rate: 0.75,
              label: '0.7×',
            },
            {
              rate: 1,
              label: '1×',
            },
            {
              rate: 1.25,
              label: '1.2×',
            },
            {
              rate: 1.75,
              label: '1.7×',
            },
            {
              rate: 2,
              label: '2×',
            },
          ],
          y = null,
          h = 1;
        c.loop &&
          (v.classList.add('kg-video-hide-animated'),
          m.classList.add('kg-video-hide-animated'));
        const p = () => {
            (d.value = Math.floor(c.currentTime)),
              (g.textContent = f(d.value)),
              t.style.setProperty(
                '--seek-before-width',
                (d.value / d.max) * 100 + '%'
              ),
              (y = requestAnimationFrame(p));
          },
          L = (e) => {
            e === d
              ? t.style.setProperty(
                  '--seek-before-width',
                  (e.value / e.max) * 100 + '%'
                )
              : t.style.setProperty(
                  '--volume-before-width',
                  (e.value / e.max) * 100 + '%'
                );
          },
          f = (e) => {
            const t = Math.floor(e / 60),
              a = Math.floor(e % 60);
            return `${t}:${a < 10 ? `0${a}` : `${a}`}`;
          },
          q = () => {
            u.textContent = f(c.duration);
          },
          b = () => {
            d.max = Math.floor(c.duration);
          },
          S = () => {
            if (c.buffered.length > 0) {
              const e = Math.floor(c.buffered.end(c.buffered.length - 1));
              t.style.setProperty('--buffered-width', (e / d.max) * 100 + '%');
            }
          };
        c.readyState > 0
          ? (q(),
            b(),
            S(),
            c.autoplay &&
              ((y = requestAnimationFrame(p)),
              i.classList.add('kg-video-hide'),
              o.classList.remove('kg-video-hide')),
            c.muted &&
              (l.classList.add('kg-video-hide'),
              s.classList.remove('kg-video-hide')))
          : c.addEventListener('loadedmetadata', () => {
              q(),
                b(),
                S(),
                c.autoplay &&
                  ((y = requestAnimationFrame(p)),
                  i.classList.add('kg-video-hide'),
                  o.classList.remove('kg-video-hide')),
                c.muted &&
                  (l.classList.add('kg-video-hide'),
                  s.classList.remove('kg-video-hide'));
            }),
          (e.onmouseover = () => {
            c.loop || a.classList.remove('kg-video-hide-animated');
          }),
          (e.onmouseleave = () => {
            !!(
              c.currentTime > 0 &&
              !c.paused &&
              !c.ended &&
              c.readyState > 2
            ) && a.classList.add('kg-video-hide-animated');
          }),
          e.addEventListener('click', () => {
            if (!c.loop) {
              !!(c.currentTime > 0 && !c.paused && !c.ended && c.readyState > 2)
                ? x()
                : E();
            }
          }),
          (c.onplay = () => {
            v.classList.add('kg-video-hide-animated'),
              m.classList.add('kg-video-hide-animated'),
              i.classList.add('kg-video-hide'),
              o.classList.remove('kg-video-hide');
          });
        const E = () => {
            v.classList.add('kg-video-hide-animated'),
              m.classList.add('kg-video-hide-animated'),
              i.classList.add('kg-video-hide'),
              o.classList.remove('kg-video-hide'),
              c.play(),
              (y = requestAnimationFrame(p));
          },
          x = () => {
            o.classList.add('kg-video-hide'),
              i.classList.remove('kg-video-hide'),
              c.pause(),
              cancelAnimationFrame(y);
          };
        v.addEventListener('click', (e) => {
          e.stopPropagation(), E();
        }),
          i.addEventListener('click', (e) => {
            e.stopPropagation(), E();
          }),
          o.addEventListener('click', (e) => {
            e.stopPropagation(), x();
          }),
          s.addEventListener('click', (e) => {
            e.stopPropagation(),
              s.classList.add('kg-video-hide'),
              l.classList.remove('kg-video-hide'),
              (c.muted = !1);
          }),
          l.addEventListener('click', (e) => {
            e.stopPropagation(),
              l.classList.add('kg-video-hide'),
              s.classList.remove('kg-video-hide'),
              (c.muted = !0);
          }),
          r.addEventListener('click', (e) => {
            e.stopPropagation();
            let t = k[(h + 1) % 5];
            (h += 1), (c.playbackRate = t.rate), (r.textContent = t.label);
          }),
          c.addEventListener('progress', S),
          d.addEventListener('input', (e) => {
            e.stopPropagation(),
              L(e.target),
              (g.textContent = f(d.value)),
              c.paused || cancelAnimationFrame(y);
          }),
          d.addEventListener('change', (e) => {
            e.stopPropagation(),
              (c.currentTime = d.value),
              c.paused || requestAnimationFrame(p);
          }),
          n.addEventListener('click', (e) => {
            e.stopPropagation();
          }),
          d.addEventListener('click', (e) => {
            e.stopPropagation();
          }),
          n.addEventListener('input', (e) => {
            e.stopPropagation();
            const t = e.target.value;
            L(e.target), (c.volume = t / 100);
          });
      },
      t = document.querySelectorAll('.kg-video-card');
    for (let a = 0; a < t.length; a++) e(t[a]);
  })();
