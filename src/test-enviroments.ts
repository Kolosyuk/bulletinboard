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
  name: '',
  description: '',
  isActive: false,
  imagesIds: ['1234-1234'],
  cost: 0,
  email: '',
  phone: '',
  location: '',
  createdAt: '',
  category: {
    id: '',
    parentId: '',
    name: '',
    childs: []
  }
}