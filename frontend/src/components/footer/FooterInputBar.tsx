import RoundedButton from "../common/RoundedButton";
import "../../styles/components/footer/rounded-input.css";
import "../../styles/components/footer/search-input.css";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";

interface IProps {
    className?: string;
}

const FooterInputBar = ({ className }: IProps) => {
    const [send, isSended] = useState(false);
    const toast = useRef<Toast>(null);

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: (values) => {
            const errors: Record<string, string> = {};

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                errors.email = "Введіть коректну електронну пошту";
            }

            return errors;
        },
        onSubmit: () => isSended(true),
    });

    useEffect(() => {
        if (send) {
            toast.current?.show({
                severity: "success",
                summary: "Успіх",
                detail: `Ви успішно підписалися на наші оновлення!`,
                life: 5000,
            });
        }
    }, [send]);

    return (
        <>
            {send && <Toast ref={toast} />}
            <form
                onSubmit={formik.handleSubmit}
                className={classNames("footer-input-bar", className)}
            >
                <InputText
                    unstyled
                    keyfilter="email"
                    className={`rounded-input ${
                        formik.touched.email && formik.errors.email
                            ? "error"
                            : ""
                    }`}
                    placeholder="Ваша пошта"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <RoundedButton onClick={() => formik.handleSubmit()}>
                    Підписатися
                </RoundedButton>
            </form>
            {formik.touched.email && formik.errors.email ? (
                <Message
                    severity="warn"
                    className="mt-2 d-flex"
                    text={formik.errors.email}
                />
            ) : null}
        </>
    );
};

export default FooterInputBar;
