import "./App.css";
import contactsData from "./contacts.json";
import { useState } from 'react'




function App() {

  const [contacts, setContacts] = useState(contactsData.slice(0, 5));
  //console.log(contacts)

  function handleClick() {
    const newContact = contactsData[Math.floor(Math.random() * contactsData.length)];
    //if過濾掉已經被加入的人
    if (contacts.includes(newContact)) {
      return
    }
    setContacts([newContact, ...contacts])
  }

  function clickToSortName() {
    //  const contactsSorted = contacts.sort((a, b) => a.name.localeCompare(b.name)) 錯誤
    setContacts((currentState) => [...currentState.sort((a, b) => a.name.localeCompare(b.name))]);
  }

  function clickToSortPopularity() {
    // const contactsSorted = contacts.sort((a, b) => a.name.localeCompare(b.name)) 錯誤
    setContacts((currentState) => [...currentState.sort((a, b) => b.popularity - a.popularity)]);
  }

  function clickToDelete(contactId) {
    setContacts(function (contacts) {
      return contacts.filter(function (contact) {
        return contact.id !== contactId
      })
    })
  }
  // 意思同上
  // const clickToDelete = contactId => {
  //   setContacts(contacts => contacts.filter(contact => contact.id !== contactId))
  // };


  return (
    <div class="container">
      <h1>IronContacts</h1>
      <div class="button-div">
        <button onClick={handleClick}>Add a contact</button>
        <button onClick={clickToSortName}>Sort by name</button>
        <button onClick={clickToSortPopularity}>Sort by popularity</button>
      </div>
      <table class="the-table">
        <thead>
          <tr class="tr">
            <th class="th">image</th>
            <th class="th">name</th>
            <th class="th">popularity</th>
            <th class="th">Oscar?</th>
            <th class="th">Emmy?</th>
            <th class="th">Actions</th>
          </tr>
        </thead>
        <tbody>

          {contacts.map(contact => {
            return (
              <tr key={contact.id}>
                <td class="td-photo"><img height="120px" src={contact.pictureUrl}></img></td>
                <td class="td-name">{contact.name}</td>
                <td class="td-pop">{Math.round(contact.popularity * 100) / 100}</td>
                <td class="td-osc">{contact.wonOscar ? <p>🏆</p> : <p>🧟</p>}</td>
                <td class="td-em">{contact.wonEmmy ? <p>🏆</p> : <p>🧟</p>}</td>
                <td class="td-act"><button onClick={() => { clickToDelete(contact.id) }} >Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>


    </div>
  )
}
export default App;



