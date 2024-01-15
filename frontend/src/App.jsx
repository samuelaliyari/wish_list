import { useContext, useEffect, useState } from "react";
import { Done, ToDos } from "./Context/Context";
import Home from "./pages/Home";

function App() {
	const [toDo, setToDo] = useState([]);
	const [done, setDone] = useState(false);
	const toDoApp = useContext(ToDos);

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
