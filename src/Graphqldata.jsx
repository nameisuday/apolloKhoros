import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';

const GET_MESSAGES_by_Id = gql`
query getmessageid($id: String!){
    message(id: $id){
      body
    }
  }
`;

 function Graphqldata({item, name}) {
    const[open, setdata]=useState(null);
    function showData(){
        setdata("active");
    }
    const {data, loading, error} = useQuery(GET_MESSAGES_by_Id, {
        variables: {
        id:name,
      }
    })
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <div >
        <li key={item.id} onClick={showData}>
            <div className='messge-cards'>
                <div className='messageId'>
                    <strong>Id : </strong>{item.id}
                </div>
                <div className='messageSubject'>
                    <strong>Subject : </strong>{item.subject}
                </div>
            </div>
        </li> 
        {
        open && 
        <div className='myform'>
            <div className='popup-content'>
                <div className='closebutton' onClick={()=>setdata(null)}>X</div>
                    <div className='messageBody'>
                    <strong>Subject : </strong><div dangerouslySetInnerHTML={{__html: data?.message?.body}}/>
                    </div>
            </div>
        </div>
    }
    </div>
        
    )

}

export default Graphqldata
