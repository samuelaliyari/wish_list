import Input from "../components/Input";
import Output from "../components/Output";

const Home = () => {
	return (
		<main className='min-w-screen px-0 py-10 '>
			<h1 className='text-center text-4xl font-bold py-5 text-indigo-800 flex-wrap'>
				My Wishes for Christmas
			</h1>
			<div className='flex  gap-20 px-20 my-14'>
				<Input />
				<Output />
			</div>
		</main>
	);
};

export default Home;
