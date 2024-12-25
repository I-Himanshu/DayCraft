// src/hooks/usePlanner.js
import { useState, useEffect } from 'react';
import { DataService, FirestoreService } from '../services/DataService';
import { PlannerService } from '../services/PlannerService';
import { useAuth } from '../context/AuthContext';

const usePlanner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState({});
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState("");
  const { user } = useAuth();
  const [plannerService, setPlannerService] = useState(null); 
  useEffect(() => {
    if (user) {
      // Initialize PlannerService with DataService and FirestoreService
      console.log(user);
      const service = new PlannerService(new DataService(new FirestoreService(user)));
      setPlannerService(service);  // Set the service in state
    }
  }, [user]);  // Effect runs when 'user' changes

  if (!user) {
    // Return loading screen or message until user is available
    return;
  }

  // Load data whenever selected date changes
  useEffect(() => {
    if (!plannerService) {
      return;
    }
    const loadData = async () => {
      const scheduleData = await plannerService.getSchedule(selectedDate);
      const todosData = await plannerService.getTodos(selectedDate);
      const notesData = await plannerService.getNotes(selectedDate);

      setSchedule(scheduleData);
      setTodos(todosData);
      setNotes(notesData);
    };

    loadData();
  }, [selectedDate, plannerService]);

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