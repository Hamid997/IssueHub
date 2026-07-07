interface modalProps {
    children: React.ReactNode
    title: string
    isOpen: boolean
    onClose: () => void
}


export default function Modal({ children, title, isOpen, onClose }: modalProps) {
    if (!isOpen) { return null }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>        
        </div>
    )
}