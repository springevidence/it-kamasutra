import { Meta, StoryObj } from '@storybook/react'
import AddItemForm from './AddItemForm'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  tags: ['autodocs'],
  argTypes: {
    callback: {
      description: 'Button clicked inside form',
      action: 'clicked',
    },
  },
}
export default meta
type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: Story = {
  args: {
    callback: action('Button clicked inside form'),
  },
}
export const AddItemFormDisabledExample: Story = {
  args: {
    callback: action('Button clicked inside form'),
    disabled: true,
  },
}
