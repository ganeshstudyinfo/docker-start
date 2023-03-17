import React from 'react'


import { gql, useQuery } from '@apollo/client'
import { useParams } from "react-router-dom";

const GET_MESSAGE_DETAIL = gql`
query DetailView($id: ID!){
  message(id: $id){
    id,
    creationDate,
    message
  }
}
`

const DetailView = (props) => {
    let {id} = useParams();
    const { loading, error, data } = useQuery(GET_MESSAGE_DETAIL,{variables:{id}});
    if (loading || !data?.message) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <h1>Message {data?.message?.id}</h1>
            <p>{data?.message?.creationDate}</p>
            <p>{data?.message?.message}</p>
        </div>
    )
}

export default  (DetailView);