import { mount } from '@vue/test-utils';
import { describe, it, expect, vi,beforeEach } from 'vitest';
import TodoCards from "@/components/TodoCards.vue";
import {createPinia, setActivePinia} from "pinia";

describe('TodoCards.vue', () => {

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('rendering todo title', () => {
        const mockTodo = {
            id: 1,
            title: 'Test Todo',
            targetDate: '2024-12-31',
            task: 'Complete Java testing',
            user: 'Sunil Sahare',
            done: false
        };
        const wrapper = mount(TodoCards, {
            propsData: {
                todos: [mockTodo]
            }
        });

        expect(wrapper.find('h3').text()).toBe(mockTodo.title);
    });

    it('rendering todo target date', () => {
        const mockTodo = {
            id: 1,
            title: 'new Todo',
            targetDate: '2024-12-31',
            task: 'Complete unit testing',
            user: 'Sham',
            done: false
        };
        const wrapper = mount(TodoCards, {
            propsData: {
                todos: [mockTodo]
            }
        });

        expect(wrapper.find('p > strong').text()).toContain('Date:');
        expect(wrapper.text()).toContain(mockTodo.task);
    });

    it('rendering todo task', () => {
        const mockTodo = {
            id: 1,
            title: 'new Todo',
            targetDate: '2024-12-31',
            task: 'Complete unit testing',
            user: 'Sham',
            done: false
        };
        const wrapper = mount(TodoCards, {
            propsData: {
                todos: [mockTodo]
            }
        });

        expect(wrapper.find('article > p > strong').text()).toContain('Task:');
        expect(wrapper.text()).toContain(mockTodo.task);
    });

    it('rendering todo user', () => {
        const mockTodo = {
            id: 1,
            title: 'new Todo',
            targetDate: '2024-12-31',
            task: 'Complete unit testing',
            user: 'Sham',
            done: false
        };
        const wrapper = mount(TodoCards, {
            propsData: {
                todos: [mockTodo]
            }
        });

        expect(wrapper.find('article > footer > small > strong').text()).toContain('Author:');
        expect(wrapper.text()).toContain(mockTodo.user);
    });


    // button unit testing pending


});
