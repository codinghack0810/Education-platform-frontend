import { createSlice } from "@reduxjs/toolkit";
// import axios from "../../utils/axios";
import instance from "../../utils/axios";
import { dispatch } from "../index";
import toast from "react-hot-toast";

const initialState = {
  questions: [],
  loading: false,
};

const questiondata = createSlice({
  name: "question",
  initialState: initialState,
  reducers: {
    getAllQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions.unshift(action.payload);
    },
    deleteQustion: (state, action) => {
      state.questions.pop(action.payload);
    },
    getStudentQuery: (state, action) => {
      state.questions = action.payload;
    },
    addAnswer: (state, action) => {
      state.questions.map((item) => {});
    },
    trueAnswer: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export default questiondata.reducer;

// export const { getAllQuestions } = questiondata.actions;

export function getQuestions() {
  return async () => {
    try {
      const res = await instance.get("/qa/allquesans");
      dispatch(questiondata.actions.getAllQuestions(res.data.data.questions));
    } catch (error) {
      console.log(error);
    }
  };
}

export function addQuestions(data) {
  return async () => {
    try {
      const res = await instance.post("/qa/addques", data);
      dispatch(questiondata.actions.addQuestion(res.data.data.newQuestion));
      toast.success("Question added successfully");
    } catch (err) {
      const error = err.res;
      console.log(error);
      toast.error(error.data.msg);
    }
  };
}

export function deleteQuestions(id) {
  return async () => {
    try {
      const res = await instance.delete(`/qa/deleteques/${id}`);
      dispatch(questiondata.actions.getAllQuestions(res.data.data.questions));
      toast.success("Question deleted successfully");
    } catch (err) {
      const error = err.res;
      console.log(error);
      toast.error(error.data.msg);
    }
  };
}

export function getStudentQuery() {
  return async () => {
    try {
      const res = await instance.get("/qa/stuques");
      dispatch(questiondata.actions.getAllQuestions(res.data.data.stuQuestion));
    } catch (error) {
      console.log(error);
    }
  };
}
export function addStudentAnswer(data, id) {
  return async () => {
    try {
      const res = await instance.post(`/qa/addans/${id}`, data);
      const newAnswer = res.data.data.newAnswer;
      console.log(newAnswer);
      dispatch(
        questiondata.actions.addQuestion(newAnswer.question, newAnswer.answer)
      );
      toast.success("Answer submited successfully");
    } catch (err) {
      const error = err.res;
      console.log(error);
      toast.error(error.data.msg);
    }
  };
}

export function trueAnswer(quesId, ansId) {
  return async () => {
    try {
      const res = await instance.post(`/qa/trueans/${quesId}/${ansId}`);
      toast.success("True Answer");
    } catch (err) {
      const error = err.res;
      console.log(error);
      toast.error(error.data.msg);
    }
  };
}
