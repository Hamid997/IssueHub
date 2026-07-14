interface InfoRowProps {
    label: string;
    value: string;
}

export default function InfoRow({
    label,
    value,
}: InfoRowProps) {

    return (
        <div className="profile-info-row">
            <span className="profile-info-label">{label}</span>
            <span className="profile-info-value">{value}</span>
        </div>
    );

}