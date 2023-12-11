import { useContext, useEffect, useState } from "react";
import { ToDos } from "../Context/Context";

const Input = () => {
	const [wish, setWish] = useState("");
	const [prio, setPrio] = useState("");
	const [newWish, setNewWish] = useState();
	const toDoInput = useContext(ToDos);

	useEffect(() => {
		toDoInput.setToDo([...toDoInput.toDo, newWish]);
	}, [newWish]);
	return (
		<section className='my-10   text-center bg-indigo-800/10 rounded-lg backdrop-blur-md w-4/6 mr-auto py-10 mx-auto p-5 '>
			<h2 className='text-blue-900 py-5 font-bold text-2xl'>
				Add a wish to your List
			</h2>
			<form className='flex flex-1 gap-3 justify-center my-10'>
				<input
					type='text'
					className='bg-transparent border-blue-900 rounded-md px-1 py-2 text-lg border-2 text-blue-900 focus:outline-none w-2/4'
					onChange={(e) => setWish(e.target.value)}
					onClick={(e) => (e.target.value = "")}
				/>
				<select
					onChange={(e) => setPrio(e.target.value)}
					name='Priority'
					id='priority'
					className='bg-transparent border-blue-900 rounded-md px-1 py-2 text-lg border-2 text-blue-900 focus:outline-none w-1/3'>
					<option value='Select Priority'> Select Priority</option>
					<option value='High'>High</option>
					<option value='Low'>Low</option>
				</select>
			</form>
			<button
				className='bg-blue-800 text-sky-100 w-4/6 text-lg font-bold rounded-md py-3 my-5'
				onClick={() =>
					setNewWish({
						name: wish,
						priority: prio,
					})
				}>
				Add Wish
			</button>
		</section>
	);
};

export default Input;
