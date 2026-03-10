interface Props {
    title: string,
    message: string
}

export const LoaderPage = ({ title, message }: Props) => {
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-body-tertiary">
            <div className="card shadow-lg border-0 rounded-4 p-4 text-center" style={{ maxWidth: 420, width: '100%' }}>
                <div className="card-body">
                    <div className="spinner-border text-primary mb-3" role="status" aria-hidden="true"></div>
                    <h5 className="fw-bold mb-2">{title}</h5>
                    <p className="text-secondary mb-0">{message}</p>
                </div>
            </div>
        </div>
    );
}
