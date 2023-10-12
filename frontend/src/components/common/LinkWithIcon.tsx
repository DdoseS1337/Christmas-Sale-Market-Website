import { Link, LinkProps, NavLinkProps, RelativeRoutingType, To } from 'react-router-dom'
import '../../styles/components/common/link-with-icon.css'

interface IProps extends NavLinkProps {
  reloadDocument?: boolean;
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
  relative?: RelativeRoutingType;
  to: To;
  src: string;
  text: string;
}

export const LinkWithIcon = (props: IProps) => {
  return (
    <Link {...(props as LinkProps)} className={'link-with-icon ' + props.className}>
      <img
        src={props.src}
        alt="image"
        className="link-with-icon__icon" />
      <span className='link-with-icon__text'>{props.text}</span>
    </Link>
  )
}
