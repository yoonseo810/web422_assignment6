import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { Row, Col, Card, Pagination } from 'react-bootstrap'
import useSWR from 'swr';
import Error from 'next/error'
import ArtworkCard from '../../components/ArtworkCard';
import validObjectIDList from '../../public/data/validObjectIDList.json';

const PER_PAGE = 12;


const Home = () => {
    const [artworkList, setArtworkList] = useState();
    const [page, setPage] = useState(1);
    const router = useRouter();
    let finalQuery = router.asPath.split("?")[1];

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    const previousPage = () =>{
        if (page > 1){
            setPage(page - 1);
        }
    }

    const nextPage = () => {
        if (page < artworkList.length){
            setPage(page + 1);
        }
    }

    useEffect(() => {
        if (data){
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
            let results = [];
            for (let i = 0; i < filteredResults.length; i += PER_PAGE){
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results);
            setPage(1);
        }
    }, [data])

    if (error){
        return (
            <Error statusCode={404} />
        )
    }else if (artworkList){
            return (
                <>
                    <Row className="gy-4">
                        {artworkList[page-1]?.map(data => (
                            <Col lg={3} key={data}>
                                <ArtworkCard objectID={data} />
                            </Col>
                        ))}
                        {artworkList.length === 0 && (
                            <Card>
                                <Card.Body>
                                    <h4>Nothing Here</h4>
                                    Try searching for something else.
                                </Card.Body>
                            </Card>
                        )}
                    </Row>
                    <br/>
                    {artworkList.length > 0 &&
                        <Row>
                            <Col>
                                <Pagination>
                                    <Pagination.Prev onClick={previousPage} />
                                    <Pagination.Item>{page}</Pagination.Item>
                                    <Pagination.Next onClick={nextPage} />
                                </Pagination>
                            </Col>
                        </Row>}
                </>
            )
        }else{
            return null;
        }
}




export default Home