export const getValueOfX = (name: string) => {
  // setting value of x dynamically
  let x

  if (name === 'username') {
    x = -30
  } else if (name === 'email') {
    x = 30
  } else {
    x = -30
  }
  return x
}
