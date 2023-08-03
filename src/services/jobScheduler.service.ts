import { Job } from "../interfaces/job.interface";

const MAX_EXECUTION_TIME = 8;

export function scheduleJobs(jobs: Job[]): Job[][] {
  const sortedJobs = jobs.sort(
    (jobA, jobB) =>
      new Date(jobA["Data Máxima de conclusão do Job"]).getTime() -
      new Date(jobB["Data Máxima de conclusão do Job"]).getTime()
  );

  const jobSets: Job[][] = [];

  while (sortedJobs.length > 0) {
    const currentJobSet: Job[] = [];
    let currentExecutionTime = 0;

    for (const job of sortedJobs) {
      const jobTime = job["Tempo estimado"];

      if (currentExecutionTime + jobTime <= MAX_EXECUTION_TIME) {
        currentExecutionTime += jobTime;
        currentJobSet.push(job);
      }
    }

    for (const job of currentJobSet) {
      const index = sortedJobs.indexOf(job);
      if (index !== -1) {
        sortedJobs.splice(index, 1);
      }
    }

    jobSets.push(currentJobSet);
  }

  return jobSets;
}
