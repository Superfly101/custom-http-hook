import { useCallback, useEffect, useState } from "react";

const useRequest = (method = "get", onAddTask) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const sendRequest = useCallback(
    async (taskText) => {
      setIsLoading(true);
      setError(null);
      const url =
        "https://react-http-6ae41-default-rtdb.firebaseio.com/tasks.json";

      try {
        let response = "";
        if (method === "get") {
          response = await fetch(url);
        } else {
          response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ text: taskText }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        }

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();

        if (method === "get") {
          const loadedTasks = [];

          console.log(data);

          for (const taskKey in data) {
            loadedTasks.push({ id: taskKey, text: data[taskKey].text });
          }
          // console.log(loadedTasks)

          setTasks(loadedTasks);
        } else {
          const generatedId = data.name; // firebase-specific => "name" contains generated id
          const createdTask = { id: generatedId, text: taskText };
          console.log(createdTask);
          onAddTask(createdTask);
        }
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [method, onAddTask]
  );

  useEffect(() => {
    if (method === "get") {
      sendRequest();
    }
  }, [sendRequest, method]);

  const taskAddHandler = (task) => {
    if (method === "get") {
      setTasks((prevTasks) => prevTasks.concat(task));
    }
  };

  return [isLoading, error, sendRequest, tasks, taskAddHandler];
};

export default useRequest;
