// src/services/PlannerService.js
export class PlannerService {
  constructor(dataService) {
    this.dataService = dataService;
    this.KEYS = {
      SCHEDULE_PREFIX: "planner_schedule_",
      NOTES_PREFIX: "planner_notes_",
      TODOS_PREFIX: "planner_todos_",
    };
  }

  formatDateKey(date) {
    return date.toISOString().split('T')[0];
  }

  getStorageKey(prefix, date) {
    return `${prefix}${this.formatDateKey(date)}`;
  }

  getDefaultSchedule() {
    const schedule = {};
    for (let hour = 9; hour <= 17; hour++) {
      const timeSlot = `${hour}:00`;
      schedule[timeSlot] = "";
    }
    return schedule;
  }

  async getSchedule(date) {
    const key = this.getStorageKey(this.KEYS.SCHEDULE_PREFIX, date);
    const scheduleData =  (await this.dataService.get(key));
    if(scheduleData) {
      return scheduleData;
    }else{
      const defaultSchedule = {
        "5:00": "",
        "8:00": "",
        "9:00": "",
        "10:00": "",
        "11:00": "",
        "12:00": "",
        "14:00": "",
        "17:00": "",
        "19:00": "",
        "20:00": "",
        "22:00": "",
        "23:00": ""
      }
      await this.dataService.set(key, defaultSchedule);
      return defaultSchedule;
    }
  }

  async updateSchedule(date, timeSlot, event) {
    const key = this.getStorageKey(this.KEYS.SCHEDULE_PREFIX, date);
    const schedule = await this.getSchedule(date);
    schedule[timeSlot] = event;
    await this.dataService.set(key, schedule);
    return schedule;
  }

  async addTimeSlot(date, timeSlot) {
    const key = this.getStorageKey(this.KEYS.SCHEDULE_PREFIX, date);
    const schedule = await this.getSchedule(date);
    if (!schedule[timeSlot]) {
      schedule[timeSlot] = "";
      await this.dataService.set(key, schedule);
    }
    return schedule;
  }

  async removeTimeSlot(date, timeSlot) {
    const key = this.getStorageKey(this.KEYS.SCHEDULE_PREFIX, date);
    const schedule = await this.getSchedule(date);
    delete schedule[timeSlot];
    await this.dataService.set(key, schedule);
    return schedule;
  }

  async getNotes(date) {
    const key = this.getStorageKey(this.KEYS.NOTES_PREFIX, date);
    return (await this.dataService.get(key)) || "";
  }

  async updateNotes(date, notes) {
    const key = this.getStorageKey(this.KEYS.NOTES_PREFIX, date);
    await this.dataService.set(key, notes);
    return notes;
  }

  // Updated Todo methods to be date-specific
  async getTodos(date) {
    const key = this.getStorageKey(this.KEYS.TODOS_PREFIX, date);
    return (await this.dataService.get(key)) || [];
  }

  async addTodo(date, text) {
    const key = this.getStorageKey(this.KEYS.TODOS_PREFIX, date);
    const todos = await this.getTodos(date);
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    todos.push(newTodo);
    await this.dataService.set(key, todos);
    return newTodo;
  }

  async toggleTodo(date, id) {
    const key = this.getStorageKey(this.KEYS.TODOS_PREFIX, date);
    const todos = await this.getTodos(date);
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      todo.updatedAt = new Date().toISOString();
      await this.dataService.set(key, todos);
    }
    return todo;
  }

  async deleteTodo(date, id) {
    const key = this.getStorageKey(this.KEYS.TODOS_PREFIX, date);
    const todos = await this.getTodos(date);
    const filteredTodos = todos.filter((t) => t.id !== id);
    await this.dataService.set(key, filteredTodos);
    return filteredTodos;
  }
}