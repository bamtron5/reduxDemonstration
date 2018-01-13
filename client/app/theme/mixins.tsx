const boxShadow = (settings: string) => (
  `
    -webkit-box-shadow: ${settings};
    box-shadow: ${settings}
  `
);

const transition = (settings: string) => (
  `
    transition: ${settings};
    -webkit-transition: ${settings};
    -moz-transition: ${settings};
    -o-transition: ${settings};
  `
);

export default {
  boxShadow,
  transition
}