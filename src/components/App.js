import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleChangetype(newType) {
    setFilters({type : newType})
  }
  function handleFindPetsClick() {
    let address = "http://localhost:3001/pets"

    if(filters.type !== "all") {
      address +=`?type=${filters.type}`
    }

    fetch(address)
    .then(r=>r.json())
    .then(data => setPets(data))
  }

  function handleOnAdoptPet(id) {
    const updatedPets = pets.map(pet => {
      return pet.id === id? {...pet, isAdopted : true} : pet 
    })
    setPets(updatedPets)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleChangetype} onFindPetsClick={handleFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleOnAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
