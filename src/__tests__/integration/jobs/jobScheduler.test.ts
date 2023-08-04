import { Job } from "../../../interfaces/job.interface";
import { scheduleJobs } from "../../../services/jobScheduler.service";
import {
  mockedjob02,
  mockedjob03,
  mockedjob04,
  mockedjob05,
  mockedjobs01,
} from "../../mocks";

describe("Job Scheduler", () => {
  function verifyScheduledJobs(jobs: Job[]) {
    const scheduledJobs = scheduleJobs(jobs);
    expect(scheduledJobs.length).toBeGreaterThanOrEqual(1);
    expect(scheduledJobs.every((jobSet) => jobSet.length > 0)).toBeTruthy();

    for (const jobSet of scheduledJobs) {
      let totalExecutionTime = 0;

      for (const job of jobSet) {
        totalExecutionTime += job["Tempo estimado"];
      }

      expect(totalExecutionTime).toBeLessThanOrEqual(8);
    }
  }

  test("should schedule jobs into arrays with a maximum execution time of 8 hours", () => {
    verifyScheduledJobs(mockedjobs01);
  });

  // test("should schedule jobs into arrays with a maximum execution time of 8 hours", () => {
  //   verifyScheduledJobs(mockedjob02);
  // });

  // test("should schedule jobs into arrays with a maximum execution time of 8 hours", () => {
  //   verifyScheduledJobs(mockedjob03);
  // });

  // test("should schedule jobs into arrays with a maximum execution time of 8 hours", () => {
  //   verifyScheduledJobs(mockedjob04);
  // });

  // test("should schedule jobs into arrays with a maximum execution time of 8 hours", () => {
  // //   verifyScheduledJobs(mockedjob05);
  // });
});
