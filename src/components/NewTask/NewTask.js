import useRequest from "../Hooks/use-request";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const enterTaskHandler = async (taskText) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
        // "https://react-http-6ae41-default-rtdb.firebaseio.com/tasks.json",
        // {
        //   method: "POST",
        //   body: JSON.stringify({ text: taskText }),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      // );

  //     if (!response.ok) {
  //       throw new Error("Request failed!");
  //     }

  //     const data = await response.json();

  //     const generatedId = data.name; // firebase-specific => "name" contains generated id
  //     const createdTask = { id: generatedId, text: taskText };

  //     props.onAddTask(createdTask);
  //   } catch (err) {
  //     setError(err.message || "Something went wrong!");
  //   }
  //   setIsLoading(false);
  // };
  const [isLoading, error, sendRequest] = useRequest('post', props.onAddTask);
  return (
    <Section>
      <TaskForm onEnterTask={sendRequest} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
