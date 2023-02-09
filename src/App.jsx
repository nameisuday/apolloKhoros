import React, { useState } from 'react'
import GraphqlData from './Graphqldata'
import './static.css'
import { useQuery, gql } from '@apollo/client';

const GET_MESSAGES = gql`
query getmessages($limit: Int) {
  messages(limit: $limit) {
      size
    items {
      id
      subject 
    }
  }
}
`;

function App() {
  const[size, setsize]=useState(null);
  function increaseSize() {
    setsize(data?.messages?.size);
  }

const {data, loading, error} = useQuery(GET_MESSAGES, {
  variables: {
    limit:5+size,
  }
})

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
   <div className='app'>
    <div className='messages-container'>
    <h1>Messages</h1>
    <ul>
      {(data?.messages?.items).map((res)=>(
        <div key={res.id}><GraphqlData item={res} name={res.id}/></div>
      ))}
    </ul>
    <div className='load_more' onClick={increaseSize}>Load more</div>
    </div>
   </div>
  )
}


export default App 
