export class PlannerService {
  constructor(dataService) {
    this.dataService = dataService;
    this.STORAGE_KEY = 'planner_data';
    this.USER_INFO_KEY = 'user_info';
    this.initialize();
  }

  async initialize() {
    // Check if user info has been saved before
    const existingUserInfo = await this.dataService.get(this.USER_INFO_KEY);
    
    if (!existingUserInfo) {
      const userInfo = this.collectUserInfo();
      await this.dataService.set(this.USER_INFO_KEY, {
        ...userInfo,
        firstVisit: new Date().toISOString(),
        lastVisit: new Date().toISOString()
      });
    } else {
      // Update last visit time
      await this.dataService.set(this.USER_INFO_KEY, {
        ...existingUserInfo,
        lastVisit: new Date().toISOString()
      });
    }
  }

  collectUserInfo() {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: {
        width: window.screen.width,
        height: window.screen.height,
        colorDepth: window.screen.colorDepth
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      deviceMemory: navigator?.deviceMemory,
      hardwareConcurrency: navigator?.hardwareConcurrency,
      connection: this.getConnectionInfo()
    };
  }

  getConnectionInfo() {
    const connection = navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection;
    if (connection) {
      return {
        type: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
    }
    return null;
  }

  formatDateKey(date) {
    return date.toISOString().split('T')[0];
  }

  async getAllPlannerData() {
    return await this.dataService.get(this.STORAGE_KEY) || {
      schedules: {},
      notes: {},
      todos: {}
    };
  }

  async getUserInfo() {
    return await this.dataService.get(this.USER_INFO_KEY);
  }

  async savePlannerData(data) {
    await this.dataService.set(this.STORAGE_KEY, data);
    return data;
  }

  getDefaultSchedule() {
    return {
      "5:00": "",
      "10:00": "",
      "12:00": "",
      "17:00": "",
      "20:00": "",
      "22:00": "",
      "23:00": ""
    };
  }

  async getSchedule(date) {
    const dateKey = this.formatDateKey(date);
    const data = await this.getAllPlannerData();
    return data.schedules[dateKey] || this.getDefaultSchedule();
  }

  async updateSchedule(date, timeSlot, event) {
    const dateKey = this.formatDateKey(date);
    const data = await this.getAllPlannerData();
    
    if (!data.schedules[dateKey]) {
      data.schedules[dateKey] = this.getDefaultSchedule();
    }
    
    data.schedules[dateKey][timeSlot] = event;
    await this.savePlannerData(data);
    return data.schedules[dateKey];
  }

  async addTimeSlot(date, timeSlot) {
    const dateKey = this.formatDateKey(date);
    const data = await this.getAllPlannerData();
    
    if (!data.schedules[dateKey]) {
      data.schedules[dateKey] = this.getDefaultSchedule();
    }
    
    if (!data.schedules[dateKey][timeSlot]) {
      data.schedules[dateKey][timeSlot] = "";
      await this.savePlannerData(data);
    }
    
    return data.schedules[dateKey];
  }

  async removeTimeSlot(date, timeSlot) {
    const dateKey = this.formatDateKey(date);
    const data = await this.getAllPlannerData();
    
    if (data.schedules[dateKey]) {
      delete data.schedules[dateKey][timeSlot];
      await this.savePlannerData(data);
    }
    
    return data.schedules[dateKey];
  }

  async getNotes(date) {
    const dateKey = this.formatDateKey(date);
    const data = await this.getAllPlannerData();
    return data.notes[dateKey] || "";
  }

  async updateNotes(date, notes) {
    const dateKey = this.formatDateKey(date);
    const data = await this.getAllPlannerData();
    data.notes[dateKey] = notes;
    await this.savePlannerData(data);
    return notes;
  }

  async getTodos(date) {
    const dateKey = this.formatDateKey(date);
    const data = await this.getAllPlannerData();
    return data.todos[dateKey] || [];
  }

  async addTodo(date, text) {
    const dateKey = this.formatDateKey(date);
    const data = await this.getAllPlannerData();
    
    if (!data.todos[dateKey]) {
      data.todos[dateKey] = [];
    }
    
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    data.todos[dateKey].push(newTodo);
    await this.savePlannerData(data);
    return newTodo;
  }

  async toggleTodo(date, id) {
    const dateKey = this.formatDateKey(date);
    const data = await this.getAllPlannerData();
    
    if (!data.todos[dateKey]) return null;
    
    const todo = data.todos[dateKey].find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      todo.updatedAt = new Date().toISOString();
      await this.savePlannerData(data);
    }
    return todo;
  }

  async deleteTodo(date, id) {
    const dateKey = this.formatDateKey(date);
    const data = await this.getAllPlannerData();
    
    if (!data.todos[dateKey]) return [];
    
    data.todos[dateKey] = data.todos[dateKey].filter(t => t.id !== id);
    await this.savePlannerData(data);
    return data.todos[dateKey];
  }

  // New utility methods for querying across dates
  async getScheduleRange(startDate, endDate) {
    const data = await this.getAllPlannerData();
    const schedules = {};
    
    let currentDate = new Date(startDate);
    const end = new Date(endDate);
    
    while (currentDate <= end) {
      const dateKey = this.formatDateKey(currentDate);
      schedules[dateKey] = data.schedules[dateKey] || this.getDefaultSchedule();
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return schedules;
  }

  async getTodosInRange(startDate, endDate) {
    const data = await this.getAllPlannerData();
    const todos = {};
    
    let currentDate = new Date(startDate);
    const end = new Date(endDate);
    
    while (currentDate <= end) {
      const dateKey = this.formatDateKey(currentDate);
      todos[dateKey] = data.todos[dateKey] || [];
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return todos;
  }

  async getCompletedTodos(date) {
    const todos = await this.getTodos(date);
    return todos.filter(todo => todo.completed);
  }

  async getPendingTodos(date) {
    const todos = await this.getTodos(date);
    return todos.filter(todo => !todo.completed);
  }
}