import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import JobItemDetails from './components/JobItemDetails'
import ResumeUpload from './components/ResumeUpload'
import CareerMap from './components/CareerMap' // ✅ Import
import DailyTask from './components/DailyTask' // ✅ Import
import AdminPanel from './components/AdminPanel'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <ProtectedRoute exact path="/upload" component={ResumeUpload} />
    <ProtectedRoute exact path="/admin" component={AdminPanel} />
    <ProtectedRoute exact path="/daily-task" component={DailyTask} />
    <ProtectedRoute exact path="/career-map" component={CareerMap} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
