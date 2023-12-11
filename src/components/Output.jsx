import { useContext, useEffect, useState } from "react";
import { Done, ToDos } from "../Context/Context";
import { v4 as uuid4 } from "uuid";

const Output = () => {
	const toDoOutput = useContext(ToDos);
	const [checked, setChecked] = useState(false);
	const checkDone = useContext(Done);

	const changeStatus = (object) => {
		toDoOutput.toDo[object].status = !toDoOutput.toDo[object].status;
		setChecked(toDoOutput.toDo[object].status);
	};

	const deleteItem = (itemIndex) => {
		toDoOutput.setToDo(
			toDoOutput.toDo.filter(
				(elt) => toDoOutput.toDo.indexOf(elt) != itemIndex,
			),
		);
	};

	useEffect(() => {
		toDoOutput.setToDo(toDoOutput.toDo);
		checkDone.setDone(checked);
		localStorage.setItem("todo", JSON.stringify(toDoOutput.toDo));
	}, [toDoOutput, checked, checkDone]);
	return (
		<section className='my-10 w-4/6 text-center bg-indigo-800/10 rounded-lg backdrop-blur-md   mr-auto py-10 mx-auto  place-items-center p-5'>
			<ul className='text-blue-800  wx-9/12 grid gap-2 place-items-center'>
				{toDoOutput.toDo.length >= 1 ? (
					toDoOutput.toDo.map((item, index) => (
						<div
							key={uuid4()}
							className={
								item.priority === "High"
									? "flex  gap-2 font-semibold justify-evenly align-baseline w-10/12 bg-red-300 rounded-lg py-3"
									: item.priority === "Low"
									? "flex  gap-2 font-semibold justify-evenly align-baseline w-10/12 bg-green-300 rounded-lg py-3"
									: "flex  gap-2 font-semibold justify-evenly align-baseline w-10/12 rounded-lg py-3  bg-blue-300"
							}>
							<input
								className='w-5 '
								type='checkbox'
								name=''
								id=''
								defaultChecked={item.status}
								onClick={() => changeStatus(index)}
							/>
							<li
								className={`${
									item.status === true ? "line-through" : null
								}`}>
								{item.name}
							</li>
							<button
								className='g-transparent border-blue-900 rounded-md w-2/6 border-2'
								onClick={() => deleteItem(index)}>
								Remove
							</button>
						</div>
					))
				) : (
					<p>Santa's Inbox is empty</p>
				)}
			</ul>
		</section>
	);
};

export default Output;
