import {useState} from 'react'

const AdminPanel = () => {
  const [fetchedJobs, setFetchedJobs] = useState([])
  const [approvedJobs, setApprovedJobs] = useState(
    JSON.parse(localStorage.getItem('approvedJobs')) || [],
  )

  const fetchJobsFromExternalAPI = async () => {
    try {
      const response = await fetch('https://remoteok.com/api')
      if (!response.ok) {
        throw new Error('Failed to fetch jobs')
      }
      const data = await response.json()
      const jobs = Array.isArray(data) ? data.slice(1, 6) : []
      setFetchedJobs(jobs)
    } catch (error) {
      console.error('Error fetching jobs:', error)
      alert('Failed to fetch jobs. Please try again later.')
    }
  }

  const approveJob = job => {
    const updatedList = [...approvedJobs, job]
    setApprovedJobs(updatedList)
    localStorage.setItem('approvedJobs', JSON.stringify(updatedList))
  }

  return (
    <div style={{padding: '24px'}}>
      <h1>Admin Job Scraper</h1>
      <button onClick={fetchJobsFromExternalAPI}>Fetch New Jobs</button>
      <h2>Fetched Jobs:</h2>
      <ul>
        {fetchedJobs.map((job, index) => {
          const jobId = job.id || job.slug || job.url || index
          const title = job.position || job.title || 'Unknown Title'
          const company = job.company || job.company_name || 'Unknown Company'

          return (
            <li key={jobId}>
              <strong>{title}</strong> at {company}
              <button
                onClick={() => approveJob(job)}
                style={{marginLeft: '10px'}}
              >
                Approve
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AdminPanel
