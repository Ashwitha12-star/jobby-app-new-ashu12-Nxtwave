import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="home-page">
      <div className="home-page-content">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <div className="button-group">
          <Link to="/jobs">
            <button className="home-button">Find Jobs</button>
          </Link>
          <Link to="/upload">
            <button className="home-button">Upload Resume</button>
          </Link>
          <Link to="/career-map">
            <button className="home-button">Career Map</button>
          </Link>
          <Link to="/daily-task">
            <button className="home-button">Daily Task</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default Home
