import {TodoModel} from "@/services/TodoModel.js";
import { describe, it, expect, vi } from 'vitest';

describe('TodoModel.validate', () => {

    it('should return an error when title is missing or invalid', () => {
        let todo = { title: '', task: 'Learn Java in 15 Days', targetDate: '2024-12-12' };
        let errors = TodoModel.validate(todo);
        expect(errors.title).toBe('Title must be between 4 and 10 characters');

        todo = { title: 'New Long Title', task: 'Learn Java in 15 Days', targetDate: '2024-12-12' };
        errors = TodoModel.validate(todo);
        expect(errors.title).toBe('Title must be between 4 and 10 characters');
    });

    it('should return an error when task is missing or invalid', () => {
        let todo = { title: 'Learn Java', task: '', targetDate: '2024-12-12' };
        let errors = TodoModel.validate(todo);
        expect(errors.task).toBe('Task must be between 10 and 200 characters');

        todo = { title: 'Learn Java', task: 'Java', targetDate: '2024-12-12' };
        errors = TodoModel.validate(todo);
        expect(errors.task).toBe('Task must be between 10 and 200 characters');
    });

    it('should return an error when target date is missing', () => {
        let todo = { title: 'Learn AI', task: 'Learn Java in 15 Days', targetDate: '' };
        let errors = TodoModel.validate(todo);
        expect(errors.targetDate).toBe('Target date is required');

        todo = { title: 'Learn Java', task: 'Learn Java in 15 Days', targetDate: 'added sme text in datee' };
        errors = TodoModel.validate(todo);
        expect(errors.targetDate).toBe('Target date is required');
    });

    it('should return an error when target date is in the past', () => {
        let todo = { title: 'Learn AI', task: 'Learn Java in 15 Days', targetDate: '2022-01-01' };
        let errors = TodoModel.validate(todo);
        expect(errors.targetDate).toBe('Target date must be today or in the future');
    });

    it('should return no errors for valid todo', () => {
        const todo = { title: 'Learn AI', task: 'Learn Java in 15 Days', targetDate: '2024-12-12' };
        const errors = TodoModel.validate(todo);
        expect(errors).toEqual({});
    });
});