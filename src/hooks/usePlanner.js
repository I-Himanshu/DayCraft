// src/hooks/usePlanner.js
import { useState, useEffect } from 'react';
import { DataService, LocalStorageService } from '../services/DataService';
import { PlannerService } from '../services/PlannerService';

const usePlanner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState({});
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState("");
  const [plannerService] = useState(() => new PlannerService(new DataService(new LocalStorageService())));

  // Load data whenever selected date changes
  useEffect(() => {
    const loadData = async () => {
      const scheduleData = await plannerService.getSchedule(selectedDate);
      const todosData = await plannerService.getTodos(selectedDate);
      const notesData = await plannerService.getNotes(selectedDate);

      setSchedule(scheduleData);
      setTodos(todosData);
      setNotes(notesData);
    };

    loadData();
  }, [selectedDate]);

  const updateSchedule = async (timeSlot, event) => {
    const updatedSchedule = await plannerService.updateSchedule(selectedDate, timeSlot, event);
    setSchedule(updatedSchedule);
  };

  const addTodo = async (text) => {
    await plannerService.addTodo(selectedDate, text);
    const updatedTodos = await plannerService.getTodos(selectedDate);
    setTodos(updatedTodos);
  };

  const toggleTodo = async (id) => {
    await plannerService.toggleTodo(selectedDate, id);
    const updatedTodos = await plannerService.getTodos(selectedDate);
    setTodos(updatedTodos);
  };

  const deleteTodo = async (id) => {
    const updatedTodos = await plannerService.deleteTodo(selectedDate, id);
    setTodos(updatedTodos);
  };

  const updateNotes = async (newNotes) => {
    const updatedNotes = await plannerService.updateNotes(selectedDate, newNotes);
    setNotes(updatedNotes);
  };

  const addTimeSlot = async (timeSlot) => {
    const updatedSchedule = await plannerService.addTimeSlot(selectedDate, timeSlot);
    setSchedule(updatedSchedule);
  };

  const removeTimeSlot = async (timeSlot) => {
    const updatedSchedule = await plannerService.removeTimeSlot(selectedDate, timeSlot);
    setSchedule(updatedSchedule);
  };

  return {
    selectedDate,
    setSelectedDate,
    schedule,
    todos,
    notes,
    updateSchedule,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateNotes,
    addTimeSlot,
    removeTimeSlot,
  };
};

export default usePlanner;