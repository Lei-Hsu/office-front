export const scrollToAnchor = (anchorId: string) => {
  const anchorElement = document.getElementById(anchorId);
  if (anchorElement) {
    anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};