import Button from 'react-bootstrap/Button'
import '../../styles/components/rounded-button.css'

interface IProps {
  children: string
}

function RoundedButton(props: IProps) {
  return (
    <Button
      className='rounded-pill rounded-button'
      size="lg"
    >{props.children}</Button>
  )
}

export default RoundedButton;