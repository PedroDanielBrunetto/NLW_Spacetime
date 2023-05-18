/* eslint-disable no-unused-vars */
import { Interface } from 'readline'

const styles = {
  color: 'red',
}

const nome = 'Diego'

// toda vez que se define um parametro, no typescript, deve se definir a tipagem
interface ButtonProps {
  title: string
}

export function Button(props: ButtonProps) {
  return <p style={styles}>{props.title}</p>
}
