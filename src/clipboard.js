const $clipboard = value => {
  if (typeof value !== "string") {
    try {
      value = JSON.stringify(value);
    } catch (e) {
      console.warn(e);

      return false;
    }
  }

  const textarea = document.createElement("textarea");

  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.cssText =
    "position:fixed;pointer-events:none;z-index:-9999;opacity:0;";

  document.body.appendChild(textarea);

  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    const editable = textarea.contentEditable;
    const readOnly = textarea.readOnly;

    textarea.contentEditable = true;
    textarea.readOnly = true;

    const range = document.createRange();
    range.selectNodeContents(textarea);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    textarea.setSelectionRange(0, 999999);
    textarea.contentEditable = editable;
    textarea.readOnly = readOnly;
  } else {
    textarea.select();
  }

  let ok = false;

  try {
    ok = document.execCommand("copy");
  } catch (e) {
    console.warn(e);
  }

  document.body.removeChild(textarea);

  return ok;
};

const plugin = {
  install(Vue, options = {}) {
    options = { name: "clipboard", ...options };

    Vue.prototype.$clipboard = $clipboard;

    const unique = (id => () => id++)(1);
    const handlers = {};

    const removeHandler = id => delete handlers[id];

    const addHandler = fn => {
      const id = unique();

      handlers[id] = fn;

      return id;
    };

    Vue.directive(options.name, {
      bind(el, { arg, value }) {
        if (arg === "error") {
          el.dataset.clipboardErrorHandler = addHandler(value);
        } else if (arg === "success") {
          el.dataset.clipboardSuccessHandler = addHandler(value);
        } else {
          el.dataset.clipboardClickHandler = addHandler(event => {
            const payload = {
              value: typeof value === "function" ? value() : value,
              event
            };

            const id = $clipboard(payload.value)
              ? el.dataset.clipboardSuccessHandler
              : el.dataset.clipboardErrorHandler;

            handlers[id] && handlers[id](payload);
          });

          el.addEventListener(
            "click",
            handlers[el.dataset.clipboardClickHandler]
          );
        }
      },

      unbind(el) {
        removeHandler(el.dataset.clipboardSuccessHandler);
        removeHandler(el.dataset.clipboardErrorHandler);
        removeHandler(el.dataset.clipboardClickHandler);

        el.removeEventListener(
          "click",
          handlers[el.dataset.clipboardClickHandler]
        );
      }
    });
  }
};

export default plugin;

if (typeof window !== `undefined` && window.Vue) {
  window.Vue.use(plugin);
}
