import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./color";
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "@storage_Key";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todo, setTodo] = useState({});

  const work = () => setWorking(true);
  const rest = () => setWorking(false);
  const onChangeText = (payload) => setText(payload);

  const addTodo = () => {
    if (text === "") return
    const newTodo = {...todo, [Date.now()]: {text, work: working}};
    setTodo(newTodo);
    saveTodo(newTodo);
    setText("");
  };

  const saveTodo = async (todo) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todo));
    } catch (e) {
      console.error(e);
    }
  }

  const loadTodo = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) setTodo(JSON.parse(json));
    } catch (e) {
      console.error(e);
    }
  }

  const deleteTodo = (key) => {
    try {
      Alert.alert("Delete To Do", "Are you sure?", [
        { text: "I'm sure", 
          onPress: () => {
            const newTodo = {...todo};
            delete newTodo[key];
            setTodo(newTodo);
            saveTodo(newTodo);
          }
        },
        { text: "Cancel"}
      ])
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(loadTodo, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ fontSize: 38,
    fontWeight: "600",
    color: theme.main, color: working ? "black" : theme.sub }}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={rest}>
          <Text
            style={{ fontSize: 38,
    fontWeight: "600",
    color: theme.main, color: !working ? "black" : theme.sub }}
          >
            Rest
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder={working ? "write to do" : "what do you want?"}
        onChangeText={onChangeText}
        value={text}
        onSubmitEditing={addTodo}
      />
      <ScrollView>
        {Object.keys(todo).map((key, index) => (
          working === todo[key].work ?
            <View key={index} style={styles.todo}>
              <Text style={styles.todoText}>{todo[key].text}</Text>
              <TouchableOpacity onPress={() => deleteTodo(key)}>
                <Text>❌</Text>
              </TouchableOpacity>
            </View> : null
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  btn: {
    
  },
  textInput: {
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "white",
  },
  todo: {
    backgroundColor: "white",
    marginBottom: 5,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoText: {
    
  },
});
