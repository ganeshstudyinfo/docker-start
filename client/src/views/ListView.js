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
    if (loading || !data?.allMessages?.length === 0) {
        return <div>Loading...</div>
    }
    return (
        <div className="ptb-100">
            <div className='d-flex flex-column'>
            {data?.allMessages.map((item,idx) => (
                <a className='p-3 mt-2' href={`/messages/${item.id}`} key={item.id}>
                    ({idx+1}) {item.message}
                </a>
            ))}
            </div>
        </div>
    )
}


export default ListView;