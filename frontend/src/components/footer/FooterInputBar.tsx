import RoundedButton from '../common/RoundedButton';
import '../../styles/components/footer/rounded-input.css'
import '../../styles/components/footer/search-input.css'

const FooterInputBar = () => {
  return (
    <div
        className='footer-input-bar'
    >
        <input
            className="rounded-input"
            placeholder='Ваша почта'
        />
        <RoundedButton>Підписатися</RoundedButton>
    </div>
  )
}

export default FooterInputBar