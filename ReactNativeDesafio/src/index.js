import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    api.get("projetos").then((res) => {
      setProjects(res.data);
    });
  }, []);
  async function handleAddProject() {
    const response = await api.post("projetos", {
      titulo: `Novo Projeto ${Date.now()}`,
      autor: "Thales",
    });
    const project = response.data;
    setProjects([...projects, project]);
  }
  return (
    <>
      <StatusBar backgroundColor="rgb(61,60,66)" barStyle="light-content" />
      <SafeAreaView style={style.container}>
        <FlatList
          data={projects}
          keyExtractor={(projects) => projects.id}
          renderItem={({ item: projects }) => (
            <Text style={style.title}>{projects.titulo}</Text>
          )}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={style.button}
          onPress={handleAddProject}
        >
          <Text style={style.buttonText}>Adicionar projetos</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(61,60,66)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#04D361",
    fontSize: 30,
  },
  button: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
