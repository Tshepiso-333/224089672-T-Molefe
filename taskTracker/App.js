import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    const trimmedText = taskText.trim();
    if (trimmedText === '') {
      Alert.alert('Please enter a task');
      return;
    }
    
    const newTask = {
      id: Date.now().toString(),
      text: trimmedText,
      done: false
    };
    
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text
        style={[styles.taskText, item.done && styles.taskTextDone]}
        onPress={() => toggleTask(item.id)}
      >
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => toggleTask(item.id)}>
        <Text style={styles.checkbox}>
          {item.done ? "✓" : "☐"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>🗑</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter new task"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f9f9f9' 
  },
  inputRow: { 
    flexDirection: 'row', 
    marginBottom: 10, 
    marginTop: 40
  },
  input: { 
    flex: 1, 
    borderColor: 'green ', 
    borderWidth: 1, 
    padding: 24, 
    borderRadius: 5, 
    
  },
  addButton: { 
    marginLeft: 5,
    backgroundColor: '#094711ff',
    padding: 15,
    borderRadius: 5,
    color: '#fff',
    justifyContent: 'center',
    
  },
  taskItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 5,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  taskText: { 
    flex: 1, 
    fontSize: 20,
    color: '#0b4121ff'
  },
  taskTextDone: { 
    textDecorationLine: 'line-through', 
    color: '#888' 
  },
  checkbox: { 
    marginRight: 10, 
    fontSize: 18 
  },
  deleteButton: { 
    marginLeft: 10, 
    fontSize: 18 
  },
  addButtonText: { 
    color: '#fff', 
    fontSize: 16 
  }
  
});