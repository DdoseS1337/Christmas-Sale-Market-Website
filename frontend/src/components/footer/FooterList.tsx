
interface IProps {
    title: string;
    list: ILink[];
}

interface ILink {
    text: string;
    link: string;
}

function FooterList(props: IProps) {
  return (
    <div>
        <p>{props.title}</p>
        {props.list.map((item) => {
            return <a  href={item.link}>{item.text}</a>
        })}
    </div>
  )
}

export default FooterList