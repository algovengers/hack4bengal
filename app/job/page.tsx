"use client"
import React, { useState } from "react";
import useFetch from "@/utils/useFetch";
import JobList from "../dashboard/_components/JobList";

interface Job {
    job_id: string;
    employer_name: string;
    job_title: string;
    job_description: string;
    job_apply_link: string;
    job_required_experience: {
        required_experience_in_months: number;
    };
    job_min_salary: number | null;
    job_max_salary: number | null;
    job_salary_currency: string | null;
    job_city: string;
    job_state: string;
}

const JobSearch = () => {
    const [role, setRole] = useState<string>("");
    const [visibleJobs, setVisibleJobs] = useState<number>(10);
    const { data, isLoading, error, refetch } = useFetch("search", role ? { query: role } : null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setVisibleJobs(10); // Reset the visible jobs count on new search
        refetch();
    };

    const loadMore = () => {
        setVisibleJobs((prev)=>prev+10);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <h1 style={{ textAlign: "center" }}>Job Search</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <input 
                    type="text" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    placeholder="Enter job role (e.g., React)" 
                    style={{ padding: "10px", width: "70%", marginRight: "10px" }}
                />
                <button type="submit" style={{ padding: "10px 20px" }}>Search</button>
            </form>

            {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
            {error && <p style={{ textAlign: "center", color: "red" }}>Error fetching jobs.</p>}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {data.slice(0, visibleJobs).map((job: Job) => (
                    <JobList job={job} role={role}/>
                ))}
            </ul>
            {visibleJobs < data.length && (
                <button onClick={loadMore} style={{ display: "block", margin: "20px auto", padding: "10px 20px" }}>Read More</button>
            )}
        </div>
    );
};

export default JobSearch;
