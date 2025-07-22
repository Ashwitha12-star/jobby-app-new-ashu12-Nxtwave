import {useState} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link, useHistory} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  const history = useHistory() // ✅ Use useHistory instead of useNavigate

  const [appliedJobs, setAppliedJobs] = useState(() => {
    const stored = localStorage.getItem('appliedJobs')
    return stored ? JSON.parse(stored) : []
  })

  const [savedJobs, setSavedJobs] = useState(() => {
    const stored = localStorage.getItem('savedJobs')
    return stored ? JSON.parse(stored) : []
  })

  const isApplied = appliedJobs.includes(id)
  const isSaved = savedJobs.includes(id)

  const handleQuickApply = e => {
    e.stopPropagation()
    e.preventDefault()
    if (!isApplied) {
      const updated = [...appliedJobs, id]
      setAppliedJobs(updated)
      localStorage.setItem('appliedJobs', JSON.stringify(updated))
      alert('✅ Applied successfully!')
    }
  }

  const handleSaveJob = e => {
    e.stopPropagation()
    e.preventDefault()
    const updated = isSaved
      ? savedJobs.filter(jobId => jobId !== id)
      : [...savedJobs, id]
    setSavedJobs(updated)
    localStorage.setItem('savedJobs', JSON.stringify(updated))
  }

  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="job-card-link">
        <div className="logo-title-container-card">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-card"
          />
          <div className="title-rating-container-card">
            <h1 className="job-title-card">{title}</h1>
            <div className="rating-container-card">
              <AiFillStar className="star-icon-card" />
              <p className="rating-number-card">{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-package-container-card">
          <div className="icon-type-container-card">
            <IoLocationSharp className="type-icon" />
            <p className="type-text">{location}</p>
          </div>
          <div className="icon-type-container-card">
            <BsFillBriefcaseFill className="type-icon" />
            <p className="type-text">{employmentType}</p>
          </div>
          <p className="package-text">{packagePerAnnum}</p>
        </div>

        <hr className="separator" />
        <h1 className="description-heading-card">Description</h1>
        <p className="job-description-card">{jobDescription}</p>

        <div className="button-row">
          <button
            className={`quick-apply-button ${isApplied ? 'applied' : ''}`}
            onClick={handleQuickApply}
            disabled={isApplied}
          >
            {isApplied ? '✅ Applied' : 'Quick Apply'}
          </button>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
