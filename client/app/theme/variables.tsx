const fonts = {
  primary: 'Verdana,Arial,Helvetica,sans-serif',
  secondary: 'system-ui'
};

const fontSize = {
  base: '100%',
  h3: '1.125rem',
  buttonSmall: '.8125rem',
  p: {
    base: '100%',
    scale: '80%'
  },
  weight: {
    heavy: 700
  }
};

const color = {
  base: '#4d4d4d',
  white: '#fff',
  orange: '#ff851f',
  orangeBorder: 'rgb(229, 104, 0)',
  hoverBackgroundOrange: '#eb6b00'
};

const button = {
  background: color.orange,
  borderColor: color.orangeBorder,
  color: color.white,
  borderRadius: '3px',
  cursor: 'pointer',
  fontWeight: fontSize.weight.heavy,
  fontSize: '1rem',
  width: '100%',
  padding: '12px 16px',
  onHover: {
    background: color.hoverBackgroundOrange
  }
};

const modal = {
  width: '889px',
  backdrop: 'rgba(0,0,0,.45)',
  background: color.white
}

export default {
  button,
  color,
  fonts,
  fontSize,
  modal
};