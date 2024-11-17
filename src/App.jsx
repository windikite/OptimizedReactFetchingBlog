import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PostList from './components/PostList'
import ToolBar from './components/ToolBar'
import { StateProvider } from './StateProvider'
import CreatePost from './components/CreatePost'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import EditPost from './components/EditPost'

const queryClient = new QueryClient();

function App() {
  return (
    <StateProvider>
      <QueryClientProvider client={queryClient}>
        <div className='App bg bg-secondary' style={{height: "100%"}}>
          <ToolBar />
          <CreatePost />
          <EditPost />
          <PostList />
        </div>
      </QueryClientProvider>
    </StateProvider>
  )
}

export default App
