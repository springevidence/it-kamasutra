import {Meta, StoryObj} from "@storybook/react";
import AddItemForm from "./AddItemForm";

const meta: Meta<typeof AddItemForm> = {
    title: 'AddItemForm',
    component: AddItemForm,
}
export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm callback={(title: string) => {alert(title)}}/>
}
