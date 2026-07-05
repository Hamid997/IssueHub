interface CardProps {
    children:React.ReactNode
    padding?:"sm"|"md"|"lg"
    bordered?:boolean
    hoverable?:boolean
}

export default function Card({children, padding, hoverable, bordered}:CardProps){
    return (
        <div
            className={`
                card
                padding-${padding}
                ${bordered ? "bordered" : ""}
                ${hoverable ? "hoverable" : ""}
            `}
        >
            {children}
        </div>
    )
}