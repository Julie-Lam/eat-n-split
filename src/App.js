import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [formAddFriendIsOpen, setFormAddFriendIsOpen] = useState(false);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {formAddFriendIsOpen && <FormAddFriend />}

        <Button handleOnClick={() => setFormAddFriendIsOpen((o) => !o)}>
          {formAddFriendIsOpen ? "Close" : "Add Friend"}
        </Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((f) => (
        <Friend friend={f} key={f.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 ? (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      ) : null}
      {friend.balance === 0 ? (
        <p className="green">You and {friend.name} are even</p>
      ) : null}
      {friend.balance > 0 ? (
        <p>
          {friend.name} owes you ${friend.balance}
        </p>
      ) : null}
      <Button>Select</Button>
    </li>
  );
}

function Button({ children, handleOnClick }) {
  return (
    <button className="button" onClick={handleOnClick}>
      {children}
    </button>
  );
}
function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>🧑‍🤝‍🧑Friend name</label>
      <input type="text"></input>

      <label>🧑‍🤝‍🧑Image URL</label>
      <input type="text"></input>

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with x</h2>

      <label>💸Bill value</label>
      <input type="text"></input>

      <label>🫵Your expenses</label>
      <input type="text"></input>

      <label>🧑‍🤝‍🧑X's expenses</label>
      <input type="text" disabled></input>

      <label>🤑Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
