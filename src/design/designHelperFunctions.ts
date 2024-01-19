export const colorSwitcherHeader = (value: number) => {
  if (value < 0) {
    return 'danger';
  } else if (value > 0) {
    return 'success';
  } else {
    return 'default';
  }
};
export const colorSwitcherSecondary = (
  value: number,
  theme: string | undefined,
) => {
  if (value < 0) {
    return 'success';
  } else if (value > 0) {
    return 'danger';
  } else if (theme === 'dark') {
    return 'default-500';
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
