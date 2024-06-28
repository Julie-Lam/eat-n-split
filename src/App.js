import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    imageURL: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    imageURL: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    imageURL: "https://i.pravatar.cc/48?u=499476",
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
  const [friendList, setFriendList] = useState(initialFriends);
  const [formAddFriendIsOpen, setFormAddFriendIsOpen] = useState(false);

  const [selectedFriend, setSelectedFriend] = useState(null);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendList={friendList}
          handleSetSelectedFriend={setSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {formAddFriendIsOpen && (
          <FormAddFriend
            handleAddFriend={setFriendList}
            handleToggleDisplayAddFriendForm={setFormAddFriendIsOpen}
          />
        )}

        <Button handleOnClick={() => setFormAddFriendIsOpen((o) => !o)}>
          {formAddFriendIsOpen ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend && <FormSplitBill friend={selectedFriend} />}
    </div>
  );
}

function FriendsList({ friendList, handleSetSelectedFriend, selectedFriend }) {
  const friends = friendList;

  return (
    <ul>
      {friends.map((f) => (
        <Friend
          friend={f}
          key={f.id}
          handleSetSelectedFriend={handleSetSelectedFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, handleSetSelectedFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  console.log(isSelected);

  function handleOnClick() {
    handleSetSelectedFriend((curSelFriend) =>
      curSelFriend?.id === friend.id ? null : friend
    );
  }
  return (
    <li className={isSelected ? "selected" : null}>
      <img src={friend.imageURL} alt={friend.name} />
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
      <Button handleOnClick={handleOnClick}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ handleAddFriend, handleToggleDisplayAddFriendForm }) {
  const [friend, setFriend] = useState({
    name: "",
    imageURL: "https://i.pravatar.cc/48",
  });

  function handleSubmitAddFriend(e) {
    e.preventDefault();

    if (!friend.name || !friend.imageURL) return;
    const newFriend = {
      ...friend,
      id: crypto.randomUUID(),
      balance: 0,
    };

    handleAddFriend((curFriendList) => [...curFriendList, newFriend]);
    handleToggleDisplayAddFriendForm(false);

    setFriend({ name: "", imageURL: "https://i.pravatar.cc/48" });
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
        value={friend.name}
        onChange={(e) =>
          setFriend((curFriend) => {
            return { ...curFriend, name: e.target.value };
          })
        }
      ></input>

      <label htmlFor="imageURL">🧑‍🤝‍🧑Image URL</label>
      <input
        type="text"
        id="imageURL"
        value={friend.imageURL}
        onChange={(e) =>
          setFriend((curFriend) => {
            return { ...curFriend, imageURL: e.target.value };
          })
        }
      ></input>

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ friend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend.name}</h2>

      <label>💸Bill value</label>
      <input type="text"></input>

      <label>🫵Your expenses</label>
      <input type="text"></input>

      <label>🧑‍🤝‍🧑{friend.name}'s expenses</label>
      <input type="text" disabled></input>

      <label>🤑Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
