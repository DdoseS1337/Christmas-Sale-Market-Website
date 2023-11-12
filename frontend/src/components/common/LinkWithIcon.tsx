import { Link, LinkProps } from 'react-router-dom'
import '../../styles/components/common/link-with-icon.css'

interface IProps extends LinkProps {
  src: string;
  text: string;
}

export const LinkWithIcon = ({className, src, text, ...linkProps}: IProps) => {
  return (
    <Link {...linkProps} className={'link-with-icon ' + className}>
      <img
        src={src}
        alt="icon"
        className="link-with-icon__icon" />
      <span className='link-with-icon__text'>{text}</span>
    </Link>
  )
}
