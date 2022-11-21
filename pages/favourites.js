import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { Row, Col, Card, Pagination } from 'react-bootstrap'
import ArtworkCard from "../components/ArtworkCard";


const Favourites = () => {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    if (!favouritesList) return null;

    if (favouritesList.length === 0){
        return (
            <>
                <Card>
                    <Card.Body>
                        <h4>Nothing Here</h4>
                        Try adding some new artwork to the list.
                    </Card.Body>
                </Card>
            </>
        )
    }else{
        return (
            <>
                <Row className="gy-4">
                    {favouritesList?.map(data => (
                        <Col lg={3} key={data}>
                            <ArtworkCard objectID={data} />
                        </Col>
                    ))}
                </Row>
            </>
        )
    }
}

export default Favourites