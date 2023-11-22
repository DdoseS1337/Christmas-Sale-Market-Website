import { Toast } from "primereact/toast";
import { useRef } from "react";
import { CONTACTS } from "../../common";

const ErrorMessage = () => {
    const toast = useRef<Toast>(null);

    toast.current?.show({
        severity: "error",
        summary: "Помилка",
        detail: `Сталася помилка! Ви можете повідомити про проблему написавши на нашу електронну адресу: ${CONTACTS.email}`,
        life: 10000,
    });

    return <Toast ref={toast} />;
};

export default ErrorMessage;
