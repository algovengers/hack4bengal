import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react'
import moment from "moment";
import { createInterview } from '@/actions/interview';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


function JobList({ job, role }: { job: any, role: any }) {

  const { user } = useUser()
  const [isLoading, setLoading] = useState(false)

  const router = useRouter()
  async function handleClick() {
    setLoading(false)
    const data = {
      jobPosition: job.job_title!,
      jobDesc: role!,
      jobExperience: (job.job_required_experience.required_experience_in_months / 12)!,
      createdBy: user?.primaryEmailAddress?.emailAddress || "",
      createdAt: moment().format("DD-MM-yyyy"),
    };
    try {
      const resp = await createInterview(JSON.stringify(data));
      if (resp) {
        console.log("Inserted id", resp.result);
        if (resp.result) {
          router.push("/dashboard/interview/" + resp.result[0]?.mockId);
        } else {
          toast("Something went wrong")
        }
      }
    } catch (error) {
      toast("Something went wrong")
    } finally {
      setLoading(false)
    }

  }

  return (
    <li key={job.job_id} style={{ marginBottom: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "5px" }}>
      <h2 style={{ marginBottom: "10px" }}>{job.job_title}</h2>
      {/* <p style={{ marginBottom: "10px" }}>{job.job_description?.split('\n').slice(0, 2).join(' ')}</p> */}
      <p style={{ marginBottom: "10px" }}>Experience: {job.job_required_experience.required_experience_in_months / 12} years</p>
      {job.job_min_salary && job.job_max_salary && job.job_salary_currency && (
        <p style={{ marginBottom: "10px" }}>
          Pay: {job.job_min_salary} - {job.job_max_salary} {job.job_salary_currency}
        </p>
      )}
      <p style={{ marginBottom: "10px" }}>Location: {job.job_city}, {job.job_state}</p>
      <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline" }}>Apply Here</a>
      <div>{
        !!isLoading ? <Button disabled>Loading</Button> : <Button onClick={handleClick}>Mock Interview</Button>
      }</div>
    </li>
  )
}

export default JobList