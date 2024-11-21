import EditPost from './EditPost'
import CreatePost from './CreatePost'
import PostList from './PostList'


function Dashboard() {
    return ( 
        <div className='App bg bg-secondary' style={{height: "100%"}}>
          <CreatePost />
          <EditPost />
          <PostList />
        </div>
    );
}

export default Dashboard;