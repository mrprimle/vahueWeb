/*
 * Static snapshot of scale.com/careers' Greenhouse board (api.greenhouse.io/v1/boards/scaleai/jobs?content=true),
 * captured 2026-10-31: every department that had open roles that day (15), with the first three roles of each
 * by title. The live page fetches the board client-side; the clone renders this snapshot instead of calling the API.
 * `department` = the job's "External Department" metadata value, else departments[0].name (Scale's grouping rule).
 * `location` keeps Greenhouse's raw value; multi-office roles are "; "-separated and split into one row per office.
 */
import type { CareersJob } from './content'

export const SCALE_JOBS_SNAPSHOT: CareersJob[] = [
  { id: 4688021005, title: "Finance Systems Integration Lead", department: "Data Science and Analytics", location: "San Francisco, CA", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4688021005" },
  { id: 4729899005, title: "Senior Data Analyst, Public Sector", department: "Data Science and Analytics", location: "Washington, DC", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4729899005" },
  { id: 4413992005, title: "Applied AI Engineer, Global Public Sector", department: "Engineering", location: "Doha, Qatar; London, UK", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4413992005" },
  { id: 4733702005, title: "Engineering Manager, Customer Platform (GenAI)", department: "Engineering", location: "San Francisco, CA; New York, NY", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4733702005" },
  { id: 4719479005, title: "Engineering Manager, Infrastructure ", department: "Engineering", location: "London, UK", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4719479005" },
  { id: 4725451005, title: "Enterprise Pricing Manager", department: "Finance", location: "San Francisco, CA; New York, NY", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4725451005" },
  { id: 4748288005, title: "Global Procurement Analyst", department: "Finance", location: "Mexico City, MX", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4748288005" },
  { id: 4748981005, title: "Head of Corporate Accounting", department: "Finance", location: "San Francisco, CA", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4748981005" },
  { id: 4747295005, title: "Creative Advisor - Human Frontier Collective", department: "Human Frontier Collective", location: "United States", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4747295005" },
  { id: 4613327005, title: "Finance Fellow - Human Frontier Collective (UK)", department: "Human Frontier Collective", location: "United Kingdom", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4613327005" },
  { id: 4613333005, title: "Legal Fellow - Human Frontier Collective (UK)", department: "Human Frontier Collective", location: "United Kingdom", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4613333005" },
  { id: 4741059005, title: "IT Support Engineer", department: "IT", location: "Mexico City, MX", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4741059005" },
  { id: 4704551005, title: "IT Systems Engineer", department: "IT", location: "Washington, DC", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4704551005" },
  { id: 4651614005, title: "Lead Counsel, Product", department: "Legal & GRC", location: "San Francisco, CA", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4651614005" },
  { id: 4739727005, title: "Account Based Marketing Lead", department: "Marketing and Communications", location: "San Francisco, CA; New York, NY", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4739727005" },
  { id: 4748330005, title: "Director of Partner Marketing", department: "Marketing and Communications", location: "San Francisco, CA; New York, NY", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4748330005" },
  { id: 4741462005, title: "Field Marketing & Events Manager, Frontier Data", department: "Marketing and Communications", location: "San Francisco, CA; New York, NY", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4741462005" },
  { id: 4731928005, title: "Contributor Experience Manager, Community", department: "Operations", location: "San Francisco, CA; New York, NY", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4731928005" },
  { id: 4725509005, title: "Data Acquisition Lead, Frontier Environments", department: "Operations", location: "San Francisco, CA; New York, NY", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4725509005" },
  { id: 4687052005, title: "Frontier Data Strategist", department: "Operations", location: "San Francisco, CA; New York, NY", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4687052005" },
  { id: 4738221005, title: "Global Head of Workplace", department: "People", location: "San Francisco, CA", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4738221005" },
  { id: 4609736005, title: "AI Product Manager (Coding/Multimodal)", department: "Product and Design", location: "San Francisco, CA", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4609736005" },
  { id: 4673051005, title: "Forward Deployed Product Manager, Enterprise", department: "Product and Design", location: "New York, NY", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4673051005" },
  { id: 4644742005, title: "Forward Deployed Product Manager, Enterprise", department: "Product and Design", location: "London, UK", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4644742005" },
  { id: 4745295005, title: "Contracts Manager", department: "Public Sector", location: "Washington, DC", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4745295005" },
  { id: 4713532005, title: "Deployment Strategist, Space Systems Command", department: "Public Sector", location: "Los Angeles, CA", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4713532005" },
  { id: 4674863005, title: "DevOps Engineer, Infrastructure & Security", department: "Public Sector", location: "Washington, DC", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4674863005" },
  { id: 4728014005, title: "Machine Learning Research Scientist, Evaluations", department: "Research", location: "San Francisco, CA; Seattle, WA; New York, NY", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4728014005" },
  { id: 4528009005, title: "Machine Learning Research Scientist, Post-Training", department: "Research", location: "San Francisco, CA; Seattle, WA; New York, NY", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4528009005" },
  { id: 4534631005, title: "ML Research Engineer, ML Systems", department: "Research", location: "San Francisco, CA; Seattle, WA; New York, NY", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4534631005" },
  { id: 4715976005, title: "AI Advisory Principal", department: "Sales", location: "San Francisco, CA; New York, NY", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4715976005" },
  { id: 4727671005, title: "Deployment Strategist - DHS/DOJ", department: "Sales", location: "Washington, DC", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4727671005" },
  { id: 4646946005, title: "Enterprise Account Executive", department: "Sales", location: "San Francisco, CA", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4646946005" },
  { id: 4704285005, title: "Subject Matter Expert", department: "Specialist", location: "Canada; United States", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4704285005" },
  { id: 4735665005, title: "Machine Learning Research Intern (Summer 2027)", department: "University", location: "New York, NY; San Francisco, CA", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4735665005" },
  { id: 4730851005, title: "Software Engineer - New Grad", department: "University", location: "Doha, Qatar ", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4730851005" },
  { id: 4730836005, title: "Software Engineer - New Grad", department: "University", location: "San Francisco, CA", applyUrl: "https://job-boards.greenhouse.io/scaleai/jobs/4730836005" },
]
