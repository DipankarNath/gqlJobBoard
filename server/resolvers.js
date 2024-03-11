export const resolvers = {
    Query: {
        job: () => {
            return {
                title: 'Job 1',
                description: 'this is a job description'
            }
        }
    }
};