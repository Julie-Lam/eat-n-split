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

function Button({ children, handleOnClick }) {
  return (
    <button className="button" onClick={handleOnClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [formAddFriendIsOpen, setFormAddFriendIsOpen] = useState(false);
  const [friendList, setFriendList] = useState(initialFriends);
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friendList={friendList} />
        {formAddFriendIsOpen && (
          <FormAddFriend handleAddFriend={setFriendList} />
        )}

        <Button handleOnClick={() => setFormAddFriendIsOpen((o) => !o)}>
          {formAddFriendIsOpen ? "Close" : "Add Friend"}
        </Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friendList }) {
  const friends = friendList;

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

function FormAddFriend({ handleAddFriend }) {
  // const [friend, setFriend] = useState({
  //   imageURL: "https://i.pravatar.cc/48",
  // });

  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");

  function handleSubmitAddFriend(e) {
    e.preventDefault();

    // if (!friend.name || !friend.imageURL) return;

    if (!name || !imageURL) return;
    // const newFriend = {
    //   ...friend,
    //   id: crypto.randomUUID(),
    //   balance: 0,
    // };

    const newFriend = {
      name: name,
      imageURL: imageURL,
      id: crypto.randomUUID(),
      balance: 0,
    };
    handleAddFriend((curFriendList) => [...curFriendList, newFriend]);

    // setFriend({ name: "", imageURL: "" });
    setName("");
    setImageURL("");
  }

  return (
    <form
      className="form-add-friend"
      onSubmit={(e) => handleSubmitAddFriend(e)}
    >
      <label htmlFor="name">🧑‍🤝‍🧑Friend name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label htmlFor="imageURL">🧑‍🤝‍🧑Image URL</label>
      <input
        type="text"
        id="imageURL"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      ></input>

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
