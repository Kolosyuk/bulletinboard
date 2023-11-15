import { Advert } from './app/model/advert.interface';
import { Category } from './app/model/category.interface';

export const mockCategory: Category = {
  id: '1234-12345-1234-12345',
  parentId: '',
  name: 'mock category',
  childs: []
};

export const mockAdvert: Advert = {
  id: 123,
  user: {
    adverts: [],
    id: '',
    name: '',
    registeredTime: '',
    role: ''
  },
  name: 'test advert',
  description: 'description for stub advert',
  isActive: false,
  imagesIds: ['1234-1234'],
  cost: 100,
  email: '',
  phone: '8-800-888-88-88',
  location: 'test location',
  createdAt: '2023-11-01T00:00:00.000Z',
  category: {
    id: '',
    parentId: '',
    name: '',
    childs: []
  }
}