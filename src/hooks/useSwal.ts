
import Swal, { type SweetAlertOptions, type SweetAlertResult } from "sweetalert2";

type UserAlertOptions = Partial<SweetAlertOptions> & {
    title: SweetAlertOptions["title"];
    icon: SweetAlertOptions["icon"];
    text?: SweetAlertOptions["text"];
    html?: SweetAlertOptions["html"];
    footer?: SweetAlertOptions["footer"];
};

export const useSwal = () => {
    const fireSwalUserAction = (options: SweetAlertOptions): Promise<SweetAlertResult> => {
        return Swal.fire(options);
    };

    const fireSwal = (options: UserAlertOptions): Promise<SweetAlertResult> => {
        return Swal.fire(options as SweetAlertOptions);
    };

    return {
        fireSwal,
        fireSwalUserAction,
    };
};
