function util(key: string, value: string, element?: HTMLElement | null) {
  if (element) {
    element.style.setProperty(key, value);
  } else {
    document.documentElement.style.setProperty(key, value);
  }
}

export default util;
