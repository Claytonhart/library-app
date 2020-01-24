const onEscOrClickOutside = (callback, element) => {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  const outsideClickListener = event => {
    if (!element.contains(event.target) && isVisible(element)) {
      onClose();
    }
  };

  const onClose = () => {
    document.removeEventListener('keydown', keydownHandler);
    document.removeEventListener('mousedown', outsideClickListener);
    callback(false);
  };

  const isVisible = elem =>
    !!elem &&
    !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

  document.addEventListener('mousedown', outsideClickListener);
  document.addEventListener('keydown', keydownHandler);

  return () => {
    document.removeEventListener('mousedown', outsideClickListener);
    document.removeEventListener('keydown', keydownHandler);
  };
};

export default onEscOrClickOutside;
