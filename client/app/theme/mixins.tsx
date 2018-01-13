const boxShadow = (settings: string) => {
  return (
    `
      -webkit-box-shadow: ${settings};
      box-shadow: ${settings}
    `
  );
}

const transition = (settings: string) => {
  return (
    `
      transition: ${settings};
      -webkit-transition: ${settings};
      -moz-transition: ${settings};
      -o-transition: ${settings};
    `
  );
}

export default {
  boxShadow,
  transition
}