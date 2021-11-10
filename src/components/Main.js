import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  //best place to store state so you can use for all pages
  const [people, setPeople] = useState(null);

  const URL = "https://react-people-backend.herokuapp.com/people/";

  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  };
//submitted
  const createPeople = async (person) => {
    // make post request to create people
    await fetch(URL, {
      method: "post",
      headers: {
        //tells it is json with middleware
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };
  const updatePeople = async (person, id) => {
    //to update make a put request
    //headers needed when sending data only
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    })
    getPeople()
  }
  const deletePeople = async (id) => {
    await fetch(URL + id, {
      method: "delete"
    })
    getPeople()
  }

  useEffect(() => getPeople(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index people={people} createPeople={createPeople} />
        </Route>
        <Route
          path="/people/:id"
          render={(rp) => (
            <Show
            //need id that is main reason for routerprops
              {...rp}
              people={people}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;