import { useState } from 'react';

function Show(props) {
  //use router props
  const id = props.match.params.id;
  //save people standalone
  const people = props.people;
  //find person to show
  const person = people.find((singlePerson) => {
    //return true or false
    return singlePerson._id === id
  });
  //you can pass the person since that is the only one to update-- pre filled form by passing person to useState() person is the variable from the find function
  const [editForm, setEditForm] = useState(person);

  const handleChange = (event) => {
    //update state with new object unique object but same with spread with original state
    setEditForm({
      ...editForm, [event.target.name]: event.target.value
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault()
    //editForm represents person updatePeople took two arguments from main.js
    props.updatePeople(editForm, person._id);
    //redirect to index using a router prop that redirects
    props.history.push('/');
  }
  const removePerson = () => {
    props.deletePeople(person._id);
    props.history.push('/');
  }

  return <div className='person'>
    <h1>{person.name}</h1>
    <h2>{person.title}</h2>
    <img src={person.image} alt={person.name} />
    <button onClick={removePerson}id="delete">DELETE</button>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={editForm.name}
        name="name"
        placeholder="name"
        onChange={handleChange}
      />
      <input
        type="text"
        value={editForm.title}
        name="title"
        placeholder="title"
        onChange={handleChange}
      />
      <input
        type="text"
        value={editForm.image}
        name="image"
        placeholder="image url"
        onChange={handleChange}
      />
      <input
        type="submit"
        value="update person"
      />
    </form>
    </div>
  } 
  
  export default Show