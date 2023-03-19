import React, { useEffect, useMemo, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const GET_USER = gql`
query getCurrentUser{
    currentUser {
      id
    }
  }
`
const CREATE_MESSAGE_MUTATION = gql`    
    mutation CreateView($message: String!) {
        createMessage(message: $message){
            status,
            formErrors,
            message{
                id
            }
        }
    }
`
const CreateView = () => {
    const [messageData, setMessageData] = useState("");
    const { loading, error, data } = useQuery(GET_USER);
    const [createMessageMutate, { data:cData,error: cError }] = useMutation(CREATE_MESSAGE_MUTATION,
        {
            onCompleted: (data) => {
                window.location.replace("/");
            },
            onError: (error) => {
                console.log(error);
            },
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append("message", messageData)
        createMessageMutate({ variables: { message: data.get("message") } })
    }

    if (!loading && data.currentUser === null) {
        window.location.replace('/login/')
    }
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <h1>Create Message</h1>
            <form
                onSubmit={e => handleSubmit(e)}
            >
                <div>
                    <label>Message:</label>
                    <textarea name="message" value={messageData} onChange={(e) => setMessageData(e.target.value)} />
                </div>
                <button type="submit">Submit Message</button>
            </form>
        </div>
    )
}

export default CreateView;