import { gql } from "@apollo/client";
import { apolloClient } from './client';
import { jobByIdQuery, jobDetailFragment } from "./queries";


export const CreateJobMutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
        job: createJob(input: $input) {
            ...JobDetail
        }
    }
    ${jobDetailFragment}
`;
