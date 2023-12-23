import React from 'react';
import Feed from "./Feed";

const Home = ({posts}) => {
  // console.log(posts);
  return (
    <main className='home'>
      {posts.length ? (
         <Feed posts={posts} />
      ) : (
        <p style={{ margin: "20px" }}>
          No post display...
        </p>
      )}
     
    </main>
  )
}

export default Home