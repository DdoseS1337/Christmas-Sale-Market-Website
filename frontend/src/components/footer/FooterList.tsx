import { Link } from 'react-router-dom';
import '../../styles/components/footer/footer-list.css';

interface IProps {
    title: string;
    list: ILink[];
}

interface ILink {
    text: string;
    link: string;
}

const FooterList = (props: IProps) => {
  return (
    <div className='footer-list'>
        <h3 className='footer-list__title'>{props.title}</h3>
        {props.list.map((item, index) => {
            return <Link key={index} to={item.link}>{item.text}</Link>
        })}
    </div>
  )
}

export default FooterList