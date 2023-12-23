import React, {useState, useEffect} from "react";
import { Route, Routes, useNavigate} from "react-router-dom";
import { format} from "date-fns";
import Home from "./Home";
import Layout from "./Layout";
import About from "./About";
import Missing from "./Missing";
import PostPage from "./PostPage";
import NewPost from "./NewPost";


function App() {

  const [posts, setPosts] = useState(
	[
		{
		id: 1,
		title: "My First Post",
		datetime: "July 07, 2023 12:17:36 AM",
		body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
		},
		{
		id: 2,
		title: "My 2nd Post",
		datetime: "July 06, 2023 11:17:36 AM",
		body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
		},
		{
		id: 3,
		title: "My 3rd Post",
		datetime: "July 03, 2023 13:17:36 AM",
		body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
		},
		{
		id: 4,
		title: "My Fourth Post",
		datetime: "July 02, 2023 14:17:36 AM",
		body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
		}
	]
	);

	// const [posts, setPosts] = useState([])

	const [search, setSearch] = useState("");
	const [searchResalt, setSearchResalt] = useState([])
	const [postTitle, setPostTitle] = useState("")
	const [postBody, setPostBody] = useState("")

	const navigate = useNavigate()

	const hendleDelate = id => {
		const postList = posts.filter(post => post.id !== id)
		setPosts(postList)
		navigate("/")
	}

	const handleSubmit = e => {
		e.preventDefault()
		const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
		const datetime = format(new Date(), 'MMM dd, yyyy pp')
		const newPost = {
			id,
			title: postTitle,
			body: postBody,
			datetime
		}

		const allPost = [...posts, newPost]
		setPosts(allPost)
		setPostTitle("")
		setPostBody("")
		navigate("/")
	}

	useEffect(() => {
	  const filterPost = posts.filter(post => 
			((post.body).toLowerCase()).includes(search.toLowerCase())
			|| ((post.title).toLowerCase()).includes(search.toLowerCase())
		)

		setSearchResalt(filterPost.reverse())
	
	}, [posts, search])
	
	 
  return (
    <Routes>
		<Route path="/" element={<Layout 
			posts={posts}
			search={search}
			setSearch={setSearch}
		/>} >
			<Route index element={<Home posts={searchResalt}/>}/>
			<Route path="post">
				<Route index element={<NewPost 
					postTitle={postTitle}
					setPostTitle={setPostTitle}
					setPostBody={setPostBody}
					postBody={postBody}
					handleSubmit={handleSubmit}
				/>} />

				<Route path=":id" element={<PostPage 
					posts={posts} 
					hendleDelate={hendleDelate}
				/>}/>
				
			</Route>

			
			<Route path="about" element={<About />} />
			<Route path="*" element={<Missing />} />
		</Route>
		
	</Routes>
  );
}

export default App;
