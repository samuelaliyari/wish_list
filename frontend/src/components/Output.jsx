import { useContext, useEffect, useState } from "react";
import { Done, ToDos } from "../Context/Context";
import { v4 as uuid4 } from "uuid";

const Output = () => {
	const { toDo, setToDo } = useContext(ToDos);

	const changeStatus = (listId, itemId) => {
		fetch(`http://localhost:3000/api/data/${listId}/status/${itemId}`, {
			method: "PATCH",
		})
			.then((res) => res.json())
			.then((data) => setToDo(data));
	};

	const deleteItem = (listId, itemId) => {
		fetch(`http://localhost:3000/api/data/${listId}/status/${itemId}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => setToDo(data));
	};

	useEffect(() => {
		fetch("http://localhost:3000/api/data")
			.then((res) => res.json())
			.then((data) => setToDo(data));
	}, []);

	return (
		<section className='my-10 w-4/6 text-center bg-indigo-800/10 rounded-lg backdrop-blur-md   mr-auto py-10 mx-auto  place-items-center p-5'>
			<ul className='text-blue-800  wx-9/12 grid gap-2 place-items-center'>
				{toDo[0]?.list && toDo[0]?.list.length !== 0 ? (
					toDo[0].list.map((item, index) => (
						<div
							key={uuid4()}
							className={
								item.priority === "High"
									? "flex  gap-2 font-semibold justify-between align-baseline w-10/12 bg-red-300 rounded-lg py-3 px-3"
									: item.priority === "Low"
									? "flex  gap-2 font-semibold justify-between align-baseline w-10/12 bg-green-300 rounded-lg py-3 px-3"
									: "flex  gap-2 font-semibold justify-between align-baseline w-10/12 rounded-lg py-3 px-3  bg-blue-300"
							}>
							<input
								className='w-5 '
								type='checkbox'
								name=''
								id=''
								defaultChecked={item.status}
								onClick={() =>
									changeStatus(toDo[0].id, item.id)
								}
							/>
							<li
								className={`${
									item.status === true ? "line-through" : null
								}`}>
								{item.title}
							</li>
							<button
								className='g-transparent border-blue-900 rounded-md w-2/6 border-2'
								onClick={() => deleteItem(toDo[0].id, item.id)}>
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
