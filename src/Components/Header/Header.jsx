import Card from "../Card/Card.jsx"

export default function Header() {

    let products = [
        {id: 1, title: 'One Piece', description: 'Pirati che combattono'},
        {id: 2, title: 'Naruto', description: 'Ninja che combattono'},
        {id: 3, title: 'Dragon Ball', description: 'Saiyan che combattono'},
    ];

    return (
        <header className="container">
            <div className="row justify-content-around my-5">
                {
                    products.map((prodotto)=>{
                        return (
                            <div key={prodotto.id} className="col-12 col-md-3 d-flex justify-content-center">
                                <Card
                                title={prodotto.title}
                                description={prodotto.description}/>
                            </div>
                        )
                    })
                }
            </div>
        </header>
    )
}