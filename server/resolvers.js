import { GraphQLError } from 'graphql';
import {createJob, getJobs, getJob, getJobsByCompanyId, deleteJob, updateJob, countJobs} from './db/jobs.js';
import {getCompany} from './db/companies.js';

export const resolvers = {
    Query: {
        jobs: async (_root, { limit, offset }) => {
            const items = await getJobs(limit, offset);
            const totalCount = await countJobs();
            return { items, totalCount };
        },
        job: async (_root, args) => {
            const job = await getJob(args.id);
            if (!job) {
                throw notFoundError('No job found with the id ' + args.id)
            }
            return job;
        },
        company: async (_root, args) => {
            const company = await getCompany(args.id);
            if (!company) {
                throw notFoundError('No company found with the id ' + id)
            }
            return company;
        },
    },
    Mutation: {
        createJob: (_root, { input: { title, description } }, { user }) => {
            if (!user) {
                throw unAuthorizedError('Missing authentication!')
            }
            return createJob({ companyId: user.companyId, title, description });
        },
        updateJob: (_root, { input: { id, title, description } }, { user }) => {
            if (!user) {
                throw unAuthorizedError('Missing authentication!')
            }
            return updateJob({ id, title, description, companyId: user.companyId });
        },
        deleteJob: (_root, { id }, { user }) => {
            if (!user) {
                throw unAuthorizedError('Missing authentication!')
            }
            return deleteJob(id, user.companyId);
        },
    },

    Company: {
        jobs: (company) => getJobsByCompanyId(company.id),
    },
    Job: {
        date: (job) => toIsoDate(job.createdAt),
        company: (job, _args, { companyLoader }) => companyLoader.load(job.companyId),
    },
};

function notFoundError(message) {
    return new GraphQLError(message, {
        extensions: { code: 'NOT_FOUND' }
    })
}

function unAuthorizedError(message) {
    return new GraphQLError(message, {
        extensions: { code: 'UNAUTHORISED_ACCESS' }
    })
}

function toIsoDate(value) {
    return value.slice(0, 'yyyy-mm-dd'.length);
}