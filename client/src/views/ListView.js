import React, { useEffect, useState } from 'react'

import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { useParams, useNavigate } from "react-router-dom";
const GET_MESSAGES = gql`
query SearchMessages($search: String) {
  allMessages(message_Icontains: $search) {
    edges {
      node {
        id
        message
        user {
          id
          username
        }
      }
    }
  }
}
`

let ListView = (props) => {


    const navigate = useNavigate();
    let { search } = useParams();

    const [searchData, setSearchData] = useState("");
    const { loading, error, data, refetch } = useQuery(GET_MESSAGES, { variables: { search: searchData } });
    if (loading || !data?.allMessages?.length === 0) {
        return <div>Loading...</div>
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        let query = `?search=${searchData}`;
        refetch()
        navigate(`/${query}`, { replace: true })
    }
    return (
        <div className="ptb-100">
            <form
                className="m-4"
                onSubmit={(e) => handleSearchSubmit(e)}
            >
                <input type="text" name="search" value={searchData} onChange={(e) => setSearchData(e.target.value)} autoComplete="off" />
                <button type="submit">Search</button>
            </form>
            <div className='d-flex flex-column'>
                {data?.allMessages?.edges?.map((item, idx) => (
                    <a className='p-3 mt-2' href={`/messages/${item?.node?.id}`} key={item?.node?.id}>
                        ({idx + 1}) {item?.node?.message}
                    </a>
                ))}
            </div>
        </div>
    )
}


export default ListView;