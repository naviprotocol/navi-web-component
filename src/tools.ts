export function isBrowser() {
  return typeof window !== 'undefined';
}

export function getWidget(name: string) {
  if (!isBrowser()) {
    return null;
  }
  return document.querySelector(name);
}
