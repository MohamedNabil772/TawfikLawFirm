// src/directives/animateOnView.js
const registry = new WeakMap();

// Utility: restart CSS animation reliably
function restartAnimation(el) {
  el.classList.remove('aov-animating');
  // force reflow so the browser restarts the animation
  // eslint-disable-next-line no-unused-expressions
  void el.offsetWidth;
  el.classList.add('aov-animating');
}

function getOptions(binding, el) {
  const value = binding?.value || {};
  return {
    anim: value.anim || el.dataset.anim || 'fade-up',
    delay:
      value.delay ??
      (el.dataset.animDelay ? Number(el.dataset.animDelay) : 0),
    duration:
      value.duration ??
      (el.dataset.animDuration ? Number(el.dataset.animDuration) : 600),
    once: value.once ?? (el.dataset.animOnce ? el.dataset.animOnce === 'true' : false),

    // Slightly easier trigger on mobile and iOS scroll containers
    rootMargin: value.rootMargin || el.dataset.animRootMargin || '0px 0px -10% 0px',
    threshold:
      value.threshold ??
      (el.dataset.animThreshold ? Number(el.dataset.animThreshold) : 0.02),

    // HTMLElement | Vue ref | string selector | null
    root: value.root || null,
  };
}

function applyBaseState(el, opts) {
  el.style.setProperty('--aov-duration', `${opts.duration}ms`);
  el.style.setProperty('--aov-delay', `${opts.delay}ms`);
  el.dataset.anim = opts.anim;
  el.classList.add('aov'); // base hidden state
}

function onEnter(el, opts, observer) {
  el.classList.add('in-view');
  restartAnimation(el);
  if (opts.once) observer.unobserve(el);
}

function onExit(el) {
  // allow re-animation on next entry
  el.classList.remove('in-view');
}

/** Find a reasonable scroll root:
 *  1) nearest ancestor with [data-scroll-root]
 *  2) otherwise first ancestor with overflowY: auto|scroll|overlay
 */
function findScrollRoot(el) {
  const marked = el.closest('[data-scroll-root]');
  if (marked) return marked;
  let node = el.parentElement;
  while (node) {
    const style = getComputedStyle(node);
    if (/(auto|scroll|overlay)/.test(style.overflowY)) return node;
    node = node.parentElement;
  }
  return null; // falls back to viewport
}

/** Accepts: HTMLElement, Vue ref, or CSS selector string */
function resolveRoot(rootOption) {
  if (!rootOption) return null;
  if (rootOption instanceof Element || rootOption === document) return rootOption;
  if (typeof rootOption === 'string') {
    try {
      return document.querySelector(rootOption);
    } catch {
      return null;
    }
  }
  if (rootOption?.value instanceof Element) return rootOption.value;
  return null;
}

export default {
  mounted(el, binding) {
    // Reduced motion: reveal immediately without animating
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    const opts = getOptions(binding, el);
    applyBaseState(el, opts);

    if (prefersReduced) {
      el.classList.add('in-view');
      el.classList.remove('aov');
      return;
    }

    const explicitRoot = resolveRoot(opts.root);
    const rootEl = explicitRoot || findScrollRoot(el);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onEnter(el, opts, observer);
          } else if (!opts.once) {
            onExit(el);
          }
        }
      },
      {
        root: rootEl || null,
        rootMargin: opts.rootMargin,
        threshold: opts.threshold,
      }
    );

    // Observe on the next frame (covers iOS/WebKit quirks)
    requestAnimationFrame(() => observer.observe(el));
    registry.set(el, observer);
  },

  updated(el, binding) {
    const opts = getOptions(binding, el);
    el.style.setProperty('--aov-duration', `${opts.duration}ms`);
    el.style.setProperty('--aov-delay', `${opts.delay}ms`);
  },

  unmounted(el) {
    const obs = registry.get(el);
    if (obs) {
      obs.disconnect();
      registry.delete(el);
    }
  },
};
