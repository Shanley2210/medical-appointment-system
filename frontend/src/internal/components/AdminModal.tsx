import { Modal, type ModalProps } from 'antd';

type AdminModalProps = ModalProps & {
    bg?: string;
};

export default function AdminModal({ children, bg, ...rest }: AdminModalProps) {
    return (
        <Modal centered destroyOnHidden maskClosable={false} {...rest}>
            {children}
        </Modal>
    );
}
