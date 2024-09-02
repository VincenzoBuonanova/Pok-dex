export default function Card({ title, description }) {

    return (
        <div className="card text-center mb-3" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h4>{description}</h4>
            </div>
        </div>
    )
}