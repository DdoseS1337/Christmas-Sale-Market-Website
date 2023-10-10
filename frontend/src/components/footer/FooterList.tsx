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
            return <a key={index} href={item.link}>{item.text}</a>
        })}
    </div>
  )
}

export default FooterList