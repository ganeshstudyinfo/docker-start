import React, { useEffect, useMemo } from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_USER = gql`
query getCurrentUser{
    currentUser {
      id
    }
  }
`
const CreateView = () => {
    const { loading, error, data } = useQuery(GET_USER)
    if (!loading && data.currentUser === null) {
        window.location.replace('/login/')
    }
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <>CreateView</>
    )
}

export default CreateView;