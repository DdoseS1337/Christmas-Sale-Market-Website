import InputGroup from 'react-bootstrap/InputGroup';
import RoundedButton from '../common/RoundedButton';
import '../../styles/components/footer/rounded-input.css'
import '../../styles/components/footer/search-bar.css'

function FooterSearchBar() {
  return (
    <div
        className='footer-search-bar'
    >
        <input
            className="rounded-input"
            placeholder='Ваша почта'
        />
        <RoundedButton>Підписатися</RoundedButton>
    </div>
  )
}

export default FooterSearchBar