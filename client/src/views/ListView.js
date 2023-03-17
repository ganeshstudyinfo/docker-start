import React from 'react'

import { gql, useQuery } from '@apollo/client'
const GET_MESSAGES = gql`
query GetMessages{
  allMessages {
    id 
    message
  }
}
`

let ListView = (props) => {
    const { loading, error, data } = useQuery(GET_MESSAGES);
    console.log(useQuery(GET_MESSAGES))
    if (loading || !data?.allMessages?.length === 0) {
        return <div>Loading...</div>
    }
    return (
        <>
            {data?.allMessages.map(item => (
                <p key={item.id}>
                    {item.message}
                </p>
            ))}
        </>
    )
}


export default ListView;