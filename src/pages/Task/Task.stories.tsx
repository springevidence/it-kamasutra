import {Meta, StoryObj} from "@storybook/react";
import {Task} from "./Task";
import {action} from '@storybook/addon-actions'
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '12wsdewfijdei', title: 'JS', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'fgdosrg8rgjuh', order: 0, addedDate:''},
        todolistId: 'fgdosrg8rgjuh'
    }
}
export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
    args: {
        task: {id: '12wsdewfijdei2343', title: 'CSS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'fgdosrg8rgjuh', order: 0, addedDate:''},
    },
};
