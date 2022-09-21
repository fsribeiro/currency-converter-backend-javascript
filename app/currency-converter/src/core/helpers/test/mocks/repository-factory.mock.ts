import { Model } from 'mongoose';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

export const repositoryMockFactory: () => MockType<Model<any>> = jest.fn(
  () => ({
    create: jest.fn((entity) => entity),
    // save: jest.fn((entity) => entity),
    // findOneOrFail: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    // findAll: jest.fn((entity) => entity),
    // update: jest.fn((entity) => entity),
    updateOne: jest.fn((entity) => entity),
    // delete: jest.fn((entity) => entity),
    // destroy: jest.fn((entity) => entity),
    findOneAndUpdate: jest.fn((entity) => entity),
    aggregate: jest.fn((entity) => entity),
    updateMany: jest.fn((entity) => entity),
    deleteMany: jest.fn((entity) => entity),
    deleteOne: jest.fn((entity) => entity),
    // ... caso necessário implementar outros metodos
  }),
);