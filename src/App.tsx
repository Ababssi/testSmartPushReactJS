
import React,{useState,useEffect} from 'react';
import './App.css';

interface IUser {
  id: string;
  lastname: string;
  firstname: string;
  age: string;
  city: string;
  address: string;
}


type IStateUser = Array<IUser> | null;

function App() {

  
  //const [data, setData] = useState<IStateUser>(null); // CORRECTION DE BUG [ PAS DE MOI ]
  const [data, setData] = useState([]);

  const [query, setQuery] = useState('');
 
  const getData=()=>{
    fetch('./data.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="App">
      <input 
        type="text" 
        placeholder="Filter by lastname" 
        onChange={(e) => setQuery(e.target.value)}
      />
      <table className="box">
        <tr>
          <th>id</th>
          <th>firstname</th>
          <th>lastname</th>
          <th>age</th>
          <th>city</th>
          <th>address</th>
        </tr>         
    {
      data?.length ? data
        .filter(user=> user.firstname.toLowerCase().includes(query.toLowerCase()))
        .map(data => {
          return (
            <tr>
                <td>{data.id}</td>
                <td>{data.lastname}</td>
                <td>{data.firstname}</td>
                <td>{data.age}</td>
                <td>{data.city}</td>
                <td>{data.address}</td>
            </tr>           
          )
      }) : null
    }     
    </table>

  </div>
  );
}
export default App;



