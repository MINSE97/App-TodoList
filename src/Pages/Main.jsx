import React from "react";
import "./Main.css";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCircleCheck as fullCheck,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { faCircleCheck as emptyCheck } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
const TodoLi = styled.li`
  display: flex;
  justify-content: space-between;
  list-style: none;
  font-size: 20px;
  padding: 20px;
`;
export default function Main() {
  const [dummy, setDummy] = useState([
    {
      id: 1,
      title: "일어나기",
      checked: false,
      edit: false,
    },
    { id: 2, title: "씻기", checked: true, edit: false },
  ]);
  const [modal, setModal] = useState(false);
  return (
    <div id="todo_container">
      <div className={modal ? "todo_box hidden" : "todo_box"}>
        <Nav />
        <Todo
          modal={modal}
          setDummy={setDummy}
          setModal={setModal}
          dummy={dummy}
        />
      </div>
    </div>
  );
}

function Nav() {
  const nowDate = moment().format("YYYY년 MM월 DD일 ");
  function getDay() {
    const now = new Date();
    const week = new Array("일", "월", "화", "수", "목", "금", "토");
    let dayOfWeek = week[now.getDay()];

    return dayOfWeek + "요일";
  }

  return (
    <div className="todo_nav">
      <div className="top_nav">
        <span>{nowDate}</span>
      </div>
      <div className="bottom_nav">
        <span>{getDay()}</span>
      </div>
    </div>
  );
}

function Todo({ modal, setModal, dummy, setDummy }) {
  const [letter, setLetter] = useState("");
  const onSubmit = (id) => {
    const editTodo = dummy.filter((el) => el.id === id);
    editTodo[0].title = letter;
    console.log(editTodo);
  };
  const onDelete = (id) => {
    const newTodo = dummy.filter((el) => el.id !== id);
    setDummy(newTodo);
  };
  const onEdit = (id) => {
    setLetter("");
    setDummy(
      dummy.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              edit: !todo.edit,
            }
          : todo
      )
    );
  };
  return (
    <>
      <div className="todoList_container">
        <div className="todoList">
          <ul>
            <span>
              {dummy.map((el, i) => {
                return (
                  <TodoLi key={el.id}>
                    <span>
                      <FontAwesomeIcon
                        className="fontAweSomeIcon"
                        icon={dummy[i].checked ? fullCheck : emptyCheck}
                        onClick={() => {
                          setDummy(
                            dummy.map((it) =>
                              it.id === el.id
                                ? { ...it, checked: !it.checked }
                                : it
                            )
                          );
                        }}
                      />
                      {el.edit ? (
                        <input
                          className="editInputBox"
                          type="text"
                          value={letter}
                          onChange={(e) => setLetter(e.target.value)}
                          onSubmit={onSubmit(el.id)}
                        ></input>
                      ) : (
                        <span
                          className={el.checked ? "todoText line" : "todoText"}
                        >
                          {el.title}
                        </span>
                      )}
                    </span>
                    <span className="list">
                      <FontAwesomeIcon
                        className="fontAweSomeIcon"
                        icon={faPen}
                        onClick={() => onEdit(el.id)}
                      />
                      <FontAwesomeIcon
                        className="fontAweSomeIcon style"
                        icon={faTrash}
                        onClick={() => onDelete(el.id)}
                      >
                        삭제
                      </FontAwesomeIcon>
                    </span>
                  </TodoLi>
                );
              })}
            </span>
          </ul>
        </div>
        <AddModal
          modal={modal}
          dummy={dummy}
          setDummy={setDummy}
          setModal={setModal}
        />
      </div>
      <div className="footer_container">
        <div
          className={modal ? "footer after" : "footer"}
          onClick={() => setModal(!modal)}
        >
          <FontAwesomeIcon className="fontAweSomeIcon" icon={faPlus} />
        </div>
      </div>
    </>
  );
}

function AddModal({ modal, dummy, setModal, setDummy }) {
  const [text, setText] = useState("");

  const addPress = (e) => {
    if (e.key === "Enter") {
      if (text === "") {
        e.preventDefault();
        alert("할 일을 입력해주세요!");
      } else {
        e.preventDefault();
        setDummy([
          ...dummy,
          { id: dummy.length + 1, title: text, checked: false, edit: false },
        ]);
        setModal(!modal);
        setText("");
      }
    }
  };
  return (
    <div className={modal ? "addModal_container open" : "addModal_container"}>
      <div className="addModal_box">
        <form>
          <input
            className="modal_text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={addPress}
            placeholder="할 일을 입력해주세요."
          ></input>
        </form>
      </div>
    </div>
  );
}
