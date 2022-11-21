import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Card, Button } from 'react-bootstrap'
import Error from 'next/error'
import { useAtom } from 'jotai'
import { favouritesAtom } from '../store'
import { addToFavourites, removeFromFavourites } from '../lib/userData'


const ArtworkCardDetail = (prop) => {

    const { data, error } = useSWR(prop.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${prop.objectID}` : null);

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        setShowAdded(favouritesList?.includes(prop.objectID))
    }, [favouritesList]);

    async function favouritesClicked() {
        if (showAdded){
            setFavouritesList(await removeFromFavourites(prop.objectID));
        }else{
            setFavouritesList(await addToFavourites(prop.objectID));
        }
    }

    if (error){
        return (
            <Error statusCode={404} />
        )
    }
    if (!data){
        return null
    }
    else{
        return (
            <>
                <Card>
                    {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
                    <Card.Body>
                        <Card.Title>{data.title? data.title : "N/A"}</Card.Title>
                        <Card.Text>
                            <strong>Date: </strong>{data.objectDate? data.objectDate : "N/A"}<br/>
                            <strong>Classification: </strong>{data.classification? data.classification : "N/A"}<br/>
                            <strong>Medium: </strong>{data.medium? data.medium : "N/A"}
                            <br/><br/>
                            <strong>Artist: </strong>{data.artistDisplayName? data.artistDisplayName + " " : "N/A"}
                            {data.artistDisplayName && data.artistWikidata_URL && <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">( wiki )</a>}<br/>
                            <strong>Credit Line: </strong>{data.creditLine? data.creditLine : "N/A"}<br/>
                            <strong>Dimensions: </strong>{data.dimensions? data.dimensions : "N/A"}
                            <br/><br/>
                            <Button
                                variant={showAdded ? "primary" : "outline-primary"}
                                onClick={favouritesClicked}>
                                    {showAdded ? '+ Favourite (added)' : '+ Favourite'}
                            </Button>
                        </Card.Text>
                    </Card.Body>
                </Card>

            </>
        )
    }
}

export default ArtworkCardDetail