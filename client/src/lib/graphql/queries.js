import { gql } from "@apollo/client";
import { apolloClient } from './client';

export const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    title
    date
    description
    company {
      id
      name
    }
  }
`;

export const jobByIdQuery = gql`
  query JobById($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export const companyByIdQuery = gql`
  query CompanyById($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
        date
      }
    }
  }
`;

export const getJobsQuery = gql`
  query Jobs {
    jobs {
      id
      title
      date
      description
      company {
        id
        name
      }
    }
  }
`;
