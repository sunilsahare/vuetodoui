import {describe, it, expect, vi, beforeEach} from "vitest";
import { mount } from "@vue/test-utils";
import TodoTable from "@/components/TodoTable.vue";
import {createPinia, setActivePinia} from "pinia";

describe("TodoTable.vue", () => {

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("rendering table heading", () => {
        const wrapper = mount(TodoTable, {
            props: { todos: [
                    { id: 1, title: "Todo 1", task: "Task 1", targetDate: "2024-12-10", done: false, user: "User 1" },
                    { id: 2, title: "Todo 2", task: "Task 2", targetDate: "2024-12-11", done: true, user: "User 2" },
                ] },
        });

        console.log('HtNL  ->',wrapper.html())

        const headers = wrapper.findAll("th");
        expect(headers[0].text()).toBe("Title");
        expect(headers[1].text()).toBe("Task");
        expect(headers[2].text()).toBe("Date");
        expect(headers[3].text()).toBe("Done?");
        expect(headers[4].text()).toBe("Edit");
        expect(headers[5].text()).toBe("Delete");
    });

    it("rendering todos", () => {
        const todos = [
            { id: 1, title: "Todo 1", task: "Task 1", targetDate: "2024-12-10", done: false, user: "User 1" },
            { id: 2, title: "Task 2 (User 2)", task: "Task 2", targetDate: "2024-12-11", done: true, user: "User 2" },
        ];

        const wrapper = mount(TodoTable, {
            props: { todos },
        });

        const rows = wrapper.findAll("tbody tr");
        expect(rows).toHaveLength(todos.length);
        expect(rows[0].find("td").text()).toContain(todos[0].title);
        expect(rows[1].find("td").text()).toContain(todos[1].task);
    });


});