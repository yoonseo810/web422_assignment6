import React from 'react'
import useSWR from 'swr'
import { Card, Button } from 'react-bootstrap'
import Link from 'next/link'
import Error from 'next/error'


const ArtworkCard = (prop) => {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${prop.objectID}`);



    if (error){
        return (
            <Error statusCode={404} />
        )
    }else if (data){
        return (
            <Card>
            <Card.Img variant="top" src={data.primaryImageSmall.length ? data.primaryImageSmall : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} />
            <Card.Body>
                <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                <Card.Text>
                    <strong>Date: </strong>{data.objectDate ? data.objectDate : "N/A"}<br/>
                    <strong>Classification: </strong>{data.classification ? data.classification : "N/A"}<br/>
                    <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}<br/>
                </Card.Text>
                <Link href={'/artwork/' + prop.objectID} passHref>
                    <Button variant="outline-primary"><strong>ID: </strong>{prop.objectID}</Button>
                </Link>
            </Card.Body>
        </Card>
        )

    }else{
        return null;
    }
}

export default ArtworkCard
