export const colorSwitcherHeader = (value: number) => {
  if (value < 0) {
    return 'danger';
  } else if (value > 0) {
    return 'success';
  } else {
    return 'default';
  }
};
export const colorSwitcherSecondary = (value: number) => {
  if (value < 0) {
    return 'success';
  } else if (value > 0) {
    return 'danger';
  } else {
    return 'default';
  }
};

export const colorSwitcherPrimary = (value: number) => {
  if (value < 0) {
    return 'danger';
  } else if (value > 0) {
    return 'success';
  } else {
    return 'default';
  }
};
