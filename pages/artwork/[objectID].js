import React from 'react';
import { Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/router';
import ArtworkCardDetail from '../../components/ArtworkCardDetail';

const ArtWorkById = () => {
    const router = useRouter();
    const { objectID } = router.query;

    return (
        <Row>
            <Col>
                <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>
    )


}

export default ArtWorkById