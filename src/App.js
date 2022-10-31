import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import SelectWeather from "./components/SelectWeather";
import TodoList from "./components/TodoList";
import initialTodos from "./data";

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [weatherStatus, setWeatherStatus] = useState({});
  const [currentFilter, setCurrentFilter] = useState("current");

  useEffect(() => {
    // You do not need to change anything in this useEffect
    async function determineCurrentWeather() {
      try {
        const location = await getUserLocation();
        const weatherCode = await getWeatherData(
          location.coords.latitude,
          location.coords.longitude
        );
        setWeatherStatus(convertWeatherCodeToEmoji(weatherCode));
      } catch (error) {
        console.error(error);
      }
    }
    determineCurrentWeather();
  }, []);

  // Function to get the current location of the user
  function getUserLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  // Function to convert the fetched weather code to our weather status object
  function convertWeatherCodeToEmoji(weatherCode) {
    switch (weatherCode) {
      case 0:
        return { emoji: "☀️", weather: "good" };
      case 1:
        return { emoji: "🌤", weather: "good" };
      case 2:
        return { emoji: "🌥", weather: "good" };
      case 3:
        return { emoji: "☁️", weather: "good" };
      default:
        return { emoji: "💩", weather: "bad" };
    }
  }

  // Function to fetch the weather data for the user's location
  async function getWeatherData(latitude, longitude) {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const data = await response.json();
    console.log(data.current_weather.weathercode);
    return data.current_weather.weathercode;
  }

  // Function to save the selected weather filter
  function handleWeatherSelect(event) {
    setCurrentFilter(event.target.value);
  }

  // Function to filter the ToDos according to the selected filter
  function filterTodos(currentFilter) {
    switch (currentFilter) {
      case "current":
        return todos.filter(
          (todo) =>
            todo.weather === weatherStatus.weather || todo.weather === "always"
        );
      case "always":
      case "good":
      case "bad":
        return todos.filter((todo) => todo.weather === currentFilter);
      case "all":
      default:
        return todos;
    }
  }

  const filteredTodos = filterTodos(currentFilter);

  function toggleCheckTodo(listId) {
    const newArray = todos.map((todo) => {
      if (todo.id === listId) {
        return { ...todo, isChecked: !todo.isChecked };
      } else {
        return todo;
      }
    });
    setTodos(newArray);
  }

  function addTodo(newId, newTitle, newIsCheckedValue, newWeatherState) {
    setTodos((currentTodos) => {
      const newTodos = [
        ...currentTodos,
        {
          id: newId,
          title: newTitle,
          isChecked: newIsCheckedValue,
          weather: newWeatherState,
        },
      ];
      return newTodos;
    });
  }

  function deleteTodo(id) {
    const newArray = todos.filter((todo) => todo.id !== id);
    setTodos(newArray);
  }

  console.log(todos);

  return (
    <>
      <Header />
      <main>
        <InfoBox emoji={weatherStatus.emoji} />
        <SelectWeather handleChange={handleWeatherSelect} />
        <TodoList
          todos={filteredTodos}
          toggleCheckTodo={toggleCheckTodo}
          list="notdone"
          deleteTodo={deleteTodo}
        >
          ToDos to be completed
        </TodoList>
        <TodoList
          todos={filteredTodos}
          toggleCheckTodo={toggleCheckTodo}
          list="done"
          deleteTodo={deleteTodo}
        >
          Done
        </TodoList>
        <AddTodo addTodo={addTodo}></AddTodo>
      </main>
    </>
  );
}

export default App;
