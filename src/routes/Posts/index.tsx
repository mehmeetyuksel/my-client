import { Button, message } from 'antd'
import { getPostsNetwork } from './network'
import { useEffect, useState } from 'react'

function Posts() {

    const [posts, setPosts] = useState<string[]>([])

    const getPosts = async () => {
        try {
          let response = await getPostsNetwork()
          setPosts(response.data.posts)
        } catch(err: any) {
            message.error(err.response.data.message)
        }
    }

    // const refreshToken = async () => {
    //     let response = await axios.get('http://localhost:8080/refresh', {
    //         withCredentials: true,           
    //     })
    // }

    useEffect(() => {
        getPosts()
    }, [])


  return (
    <div>
        <Button onClick={() => getPosts()}>
            Get Posts
        </Button>
        {/* <Button onClick={() => refreshToken()}>
            Refresh
        </Button> */}
        <br />
        {
            posts.length ? posts.map((post: string, i: number) => <li key={i}>{post}</li>) : <> {`Post bulunamadı :)`}</>
        }
    </div>
  )
}

export default Posts