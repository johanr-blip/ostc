/* OST: progressive enhancement. Native links and Shopify forms remain authoritative. */
(() => {
  function init(root = document) {
    root.querySelectorAll('[data-newsletter-form]').forEach(form => {
      if (form.dataset.ready) return;
      form.dataset.ready = 'true';
      const preference = form.querySelector('[data-line-preference]');
      const tags = form.querySelector('[data-newsletter-tags]');
      const sync = () => { if (tags && preference) tags.value = 'newsletter,ost-drop-001,line-' + preference.value; };
      preference?.addEventListener('change', sync);
      sync();
    });
    root.querySelectorAll('[data-variant-select]').forEach(select => {
      if (select.dataset.ready) return;
      select.dataset.ready = 'true';
      select.addEventListener('change', () => {
        const url = new URL(window.location.href);
        url.searchParams.set('variant', select.value);
        window.location.assign(url.href);
      });
    });
  }
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') document.querySelectorAll('.mobile-nav[open]').forEach(menu => { menu.open = false; menu.querySelector('summary')?.focus(); });
  });
  init();
  document.addEventListener('shopify:section:load', event => init(event.target));
})();
