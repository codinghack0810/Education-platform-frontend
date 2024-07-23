import React, { useState, useEffect } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { Modal } from "@mui/material";
import TextEditor from "./Texteditor";
import { deleteQuestions, trueAnswer } from "../store/reducers/questiondata";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "../store/index";
import { getSubjects } from "../store/reducers/subjectsdata";
import { getQuestions } from "../store/reducers/questiondata";

const QuestionCard = (props) => {
  const subjectsData = useSelector((state) => state.subjectsdata);
  const allSubjects = subjectsData.subjects;
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteQuestions(props.id));
  };
  const [isSelected, setIsSelected] = useState("multiple");
  const handleChange = (e) => {
    return setIsSelected(e.target.value);
  };
  const quesId = props.id;
  const handleTrue = (quesId, ansId) => {
    dispatch(trueAnswer(quesId, ansId));
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    dispatch(getQuestions());
    dispatch(getSubjects());
  }, []);

  return (
    <div className="md:mx-20 mx-3">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="w-full flex items-center justify-between gap-10 bg-green-400 my-3 md:px-10 px-4 md:py-4 py-2 rounded-xl md:text-lg text-sm"
        type="button"
        onClick={() => setState(!state)}
      >
        <div className="flex md:gap-10 gap-3">
          <div className="text-center">{props.No}</div>
          <div className="md:w-24 font-bold">{props.subject}</div>
        </div>
        <div className="flex md:gap-10 gap-3 items-center">
          <div className=" md:w-full w-10 text-gray-500">
            {props.date.split("T")[0]}
          </div>
          <div>{props.level}</div>
          <div className="text-white">
            {state ? <RemoveIcon /> : <AddIcon />}
          </div>
        </div>
      </button>
      <div
        id="dropdown"
        className="text-black mx-5 justify-between items-center"
        style={{ display: `${state ? "block" : "none"}` }}
        aria-labelledby="dropdownDefaultButton"
      >
        <div className="md:gap-2 flex justify-between items-center">
          <div className="flex items-center md:gap-5">
            <div className="w-20 md:w-36 truncate md:text-left">
              {props.topic}
            </div>
            <div className="truncate">
              {/* <div> */}
              <div
                className="md:w-[800px] w-48 text-ellipsis overflow-hidden"
                dangerouslySetInnerHTML={{ __html: props.question }}
              />
              {/* <div className="md:w-[800px] w-48 text-ellipsis overflow-hidden">
                {props.question}
              </div> */}
              {/* <div>{props.list}</div> */}
              <div className="flex flex-col w-30">
                {props.list.map((item, index) => (
                  <div key={index} className="text-lg">
                    <input type="checkbox" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="cursor-pointer" onClick={handleOpen}>
              <EditOutlinedIcon />
            </div>
            <div className="cursor-pointer" onClick={handleDelete}>
              <DeleteForeverOutlinedIcon />
            </div>
          </div>
        </div>
        <hr className="text-green-400" />
        {props.answer.map((item) => (
          <div className="">
            <div className="grid grid-cols-4 items-center text-center">
              <div>{item.student.name}</div>
              <div className="flex flex-col text-left">
                {item.answer.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
              <div>{item.answerDate.split("T")[0]}</div>
              <div>
                {item.isCorrect === true ? (
                  <ThumbUpIcon className="text-green-800" />
                ) : (
                  <div onClick={() => handleTrue(quesId, item._id)}>
                    <ThumbDownOutlinedIcon className="text-green-800" />
                  </div>
                )}
              </div>
            </div>
            <hr/>
          </div>
        ))}
      </div>
      {/* Add quesion Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="absolute md:w-[35%] w-80 bg-white top-[50%] left-[50%] flex flex-col justify-center md:py-10 py-3 md:px-10 outline-none px-5 md:text-md text-xs"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="flex justify-between md:my-5">
            <div className="md:text-xl font-bold">Adicionar questão</div>
            <div onClick={handleClose}>
              <HighlightOffIcon className="cursor-pointer" />
            </div>
          </div>
          <hr />
          <div className="md:py-2 py-1">Questão</div>
          <div
            className="h-auto text-center"
            // onMouseOut={() =>
            // setContent={setContent}
            //   setQuestionData({ ...questionData, question: content })
            // }
          >
            <TextEditor />
          </div>
          <div className="grid grid-cols-2 md:my-5 my-2">
            <label>
              <input
                type="radio"
                value="multiple"
                checked={isSelected === "multiple"}
                onChange={handleChange}
              />
              Múltiplas Escola
            </label>
            <label>
              <input
                type="radio"
                value="correct"
                checked={isSelected === "correct"}
                onChange={handleChange}
              />
              Certo ~ errado
            </label>
          </div>
          <div>
            <div>Alternativas</div>
            <div className="flex justify-between my-1">
              <div className="w-full mr-3">
                <input
                  disabled={isSelected === "correct" ? true : false}
                  placeholder="Alternativas"
                  type="text"
                  className="w-full border-2 rounded-lg outline-none md:p-2 p-1"
                ></input>
              </div>
              <button
                disabled={isSelected === "correct" ? true : false}
                className="md:px-5 md:py-3 px-2 bg-green-500 hover:bg-green-400 text-white font-bold rounded-md cursor-pointer"
              >
                Adicionar
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-3 md:mb-3 mb-1">
            <div>
              <label>
                Nível
                <select
                  className="w-full outline-none border-2 md:py-2 rounded"
                  key="level"
                  // onChange={(e) =>
                  //   setQuestionData({ ...questionData, level: e.target.value })
                  // }
                >
                  <option disabled selected={props.level}>
                    Selecione
                  </option>
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Assunto
                <select
                  className="w-full outline-none border-2 md:py-2 rounded"
                  key="subject"
                  // onChange={(e) =>
                  //   setQuestionData({ ...questionData, topic: e.target.value })
                  // }
                >
                  <option disabled value={props.topic}>
                    Selecione
                  </option>
                  {allSubjects
                    // .filter((item) => item.subjectName === questionData.subject)
                    .map((item) =>
                      item.topic.map((topic) => (
                        <option value={topic}>{topic}</option>
                      ))
                    )}
                </select>
              </label>
            </div>
            <div>
              <label>
                Diciplina
                <select
                  className="w-full outline-none border-2 md:py-2 rounded"
                  // onChange={(e) =>
                  //   setQuestionData({
                  //     ...questionData,
                  //     subject: e.target.value,
                  //   })
                  // }
                  // onChange={(e) => setSelectSubject(e.target.value)}
                  defaultValue="Selecione"
                >
                  <option disabled value={props.subject}>
                    Selecione
                  </option>
                  {allSubjects.map((item) => (
                    <option key={item._id} value={item.subjectName}>
                      {item.subjectName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <hr />
          <div className="flex justify-end text-center gap-3 md:mt-5 mt-2 mx-10">
            <div
              className="bg-gray-300 md:w-[25%] md:p-2 p-1 text-gray-700 font-bold rounded cursor-pointer hover:bg-green-400 hover:text-white"
              onClick={handleClose}
            >
              Fechar
            </div>
            <div className="bg-green-500 md:w-[25%] md:p-2 p-1 text-white font-bold rounded cursor-pointer hover:bg-green-400">
              Salvar
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuestionCard;
