import RepositoryInterface from './repository-interface';
import { Customer } from '../entity/';

export interface CustomerRepositoryInterface
	extends RepositoryInterface<Customer> {}
