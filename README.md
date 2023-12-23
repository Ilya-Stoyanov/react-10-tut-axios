# React - Axios API Requests

React для начинающих

## React json-server

## Installation

```bash
npm install
```

## Start project

```bash
npm start
```

## add json server and axios
https://www.npmjs.com/package/json-server

```bash
npm i json-server
```

https://www.npmjs.com/package/axios


```bash
npm i axios
```

## add folder data and file db.json

```bash
{
    "posts": [
      {
        "id": 1,
        "title": "Откуда он появился?",
        "datetime": "November 16, 2023 10:47:30 AM",
        "body": "Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 'de Finibus Bonorum et Malorum' Цицерона и их английский перевод, сделанный H. Rackham, 1914 год."
      },
      {
        "id": 2,
        "title": "Что такое Lorem Ipsum?",
        "datetime": "November 16, 2023 10:47:30 AM",
        "body": "Lorem Ipsum - это текст-'рыба', часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной 'рыбой' для текстов на латинице с начала XVI века."
      },
      {
        "id": 3,
        "title": "Почему он используется?",
        "datetime": "November 30, 2023 10:47:30 AM",
        "body": "Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации 'Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст..'"
      },
      {
        "id": 4,
        "title": "Где его взять?",
        "datetime": "November 20, 2023 11:05:20 AM",
        "body": "Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь."
      }
    ]
  }

```

## add new folder api and file posts.jsx

export axios from "axios"

export default axios.create({
    baseURL: "http://localhost:3500"
})

open one new terminal and add comande

```bash
npx json-server -p 3500 -w data/db.json
```

## add useEffect 

axios automaticli catch errors!  
we didn't need if(!respomse.ok)
```bash
useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await api.get("/posts")
            setPosts(response.data)
        } catch (error) {
                console.log(error.response.data);
				console.log(error.response.status);
        }
	}
}, [])
```

## New Post impruve handleSubmit

- handleSubmit add async
- add try catch
- const allPost change newPost to response.data

```bash
try {
			const response = await api.post('/posts', newPost)
			// console.log(response);
			const allPost = [...posts, response.data]
			setPosts(allPost)
			setPostTitle("")
			setPostBody("")
			navigate("/")
		} catch (error) {
			console.log(`Error: ${error.message}`);
		}
```

##  hendleDelate

- hendleDelate add async
- add try catch

```bash
try {
			await api.delete(`/posts/${id}`)
			const postList = posts.filter(post => post.id !== id)
			setPosts(postList)
			navigate("/")
		} 
    catch (error) {
			console.log(`Error: ${error.message}`);
    }
```

## add handleEdit 

- async
- add useState
- const [editTitle, setEditTitle] = useState("")
- const [editBody, setEditBody] = useState("")
- add datetime
- add updatePost

```bash
const handleEdit = async (id)=> {
		const datetime = format(new Date(), 'MMM dd, yyyy pp')
		const updatePost = {
			id,
			title: editTitle,
			body: editBody,
			datetime
		}

		try {
			const response = await api.put(`/posts/${id}`, updatePost)
			setPosts(posts.map(post => post.id === id ? {... response.data} : post))
			setEditTitle("")
			setEditBody("")
			navigate("/")
		} catch (error) {
			console.log(`Error: ${error.message}`);
		}
	}
```

## add EditPost.jsx

- import React, {useEffect} from 'react'
- import { useParams, Link } from 'react-router-dom'
- import posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle
- const { id } = useParams();
- const post = posts.find(post => (post.id).toString() === id)
- copy from NewPost code
- add check if has editTitle
- add if is not !editTitle 
- handleSubmit change (e) => e.preventDefault()
- add handleEdit(post.id) 
- value title to change 
  value={editTitle}
  onChange={ e => setEditTitle(e.target.value)}
- change value body 
  value={editBody}
  onChange={e => setEditBody(e.target.value)}

```bash
const EditPost = ({
    posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle
}) => {
    const { id } = useParams();
    // add specific post
    const post = posts.find(post => (post.id).toString() === id)

    useEffect( () => {
        if(post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }

    }, [post, setEditBody, setEditTitle])
  return (
    <main className='newPost'>
        {editTitle && 
            <>
                <h2>Edit Post</h2>
                <form className="newPostForm" onSubmit={ (e) => e.preventDefault()}>
                    <label htmlFor="postTitle">Title: </label>
                    <input 
                        type="text"
                        id="postTitle"
                        required
                        value={editTitle}
                        onChange={ e => setEditTitle(e.target.value)}
                    />
                    <label htmlFor="postBody">Body: </label>
                    <textarea 
                    id='postBody'
                    required
                    value={editBody}
                    onChange={e => setEditBody(e.target.value)}
                    />
                    <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
                </form>
            </>
        
        } { !editTitle && 
            <>
              <h2>Post not found</h2>
              <p>Well.. That's disappoint... </p>
              <p>
                <Link to="/">Visit on our page</Link>
              </p>
            </>
  
          }
    </main>
  )
}

```

## add EditPost to navigation

- import EditPost
- add path="post/:id/edit"

```bash

	<Route path="post/:id/edit" element={<EditPost
						posts={posts}
						editTitle={editTitle}
						setEditTitle={setEditTitle}
						setEditBody={setEditBody}
						editBody={editBody}
						handleEdit={handleEdit}
	/>} />

```
## PostPage
- add Link button to PostPage 
- add className twoo btn
 
```bash
<Link to={`/edit/${post.id}`}>
  <button className="editBtn">Edit Post</button>
</Link>
<button onClick={() => handleDelate(post.id)} className='deleteBtn'>
  Delete Post
</button>
```

## add style 

```bash
    
    .postPage button {
    height: 48px;
    min-width: 48px;
    border-radius: 5px;
    padding: 8px;
    font-size: 18px;
    background-color: red;
    color: #fff;
    cursor: pointer;
    transition: background-color .3s linear;
}

.postPage button:hover,
.postPage button:focus{
    opacity: 0.9;
    transform: scale(0.98);
}

.deleteBtn{
    margin-left: 5px;
}
```