import { Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const HeaderSearchBar = () => {
    return (
        <>
            <InputGroup>
                <InputGroup.Text className="search_loop">
                    <Search className="text-light" />
                </InputGroup.Text>

                <Form.Control
                    placeholder="Я шукаю..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    className="red_theme bold_text search-form"
                />

                <button className="bold_text white_theme btn_white_theme btn_sizer">
                    Знайти
                </button>
            </InputGroup>
        </>
    );
};

export default HeaderSearchBar;
