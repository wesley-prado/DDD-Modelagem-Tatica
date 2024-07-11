import RepositoryInterface from './repository-interface';
import { Product } from '../entity/';

export interface ProductRepositoryInterface
	extends RepositoryInterface<Product> {}
