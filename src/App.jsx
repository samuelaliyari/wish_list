import { useContext, useEffect, useState } from "react";
import { Done, ToDos } from "./Context/Context";
import Home from "./pages/Home";

function App() {
	const getLocalData = () => {
		const toDoLocal = localStorage.getItem("todo");
		return toDoLocal ? JSON.parse(toDoLocal) : [];
	};
	const [toDo, setToDo] = useState(getLocalData);
	const [done, setDone] = useState(false);
	const toDoApp = useContext(ToDos);
	useEffect(() => {
		setToDo(getLocalData);
	}, [toDoApp]);
	useEffect(() => {}, [done]);
	return (
		<Done.Provider value={{ done, setDone }}>
			<ToDos.Provider value={{ toDo, setToDo }}>
				<div className='bg-[url("../public/img/bg.jpeg")] bg-cover h-screen'>
					<Home />
				</div>
			</ToDos.Provider>
		</Done.Provider>
	);
}

export default App;
