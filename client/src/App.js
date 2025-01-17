import { useEffect, useState } from "react";
import axios from 'axios'
const SERVERURL = "http://localhost:4000/api/todo";
function App() {
  const [todoList, setTodoList] = useState(null);

  const fetchData = async() => {
    const response = await axios.get(SERVERURL);
      setTodoList(response.data);
 
    // fetch("http://localhost:4000/api/todo")
    //   .then((response) => response.json())
    //   .then((data) => setTodoList(data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;
    await axios.post(SERVERURL, {text, done})//데이터를 두번째 인자로 준다
    fetchData();
    // fetch("http://localhost:4000/api/todo", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     text,
    //     done,
    //   }),
    // }).then(() => fetchData());
  };

  return (
    <div className="App">
      <h1>ToDO List</h1>
      <form onSubmit={onSubmitHandler}>
        <input name="text" id="text" />
        <input name="done" id="done" type="checkbox" />
        <input type="submit" value="추가" />
      </form>
      {todoList?.map((todo) => (
        <div key={todo.id} style={{ display: "flex" }}>
          <div>{todo.id}</div>
          <div>{todo.text}</div>
          <div>{todo.done ? "Y" : "N"}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
