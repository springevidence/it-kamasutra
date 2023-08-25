import { Meta, StoryObj } from '@storybook/react'
import EditableSpan from './EditableSpan'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof EditableSpan> = {
  title: 'TODOLISTS/EditableSpan',
  component: EditableSpan,
  tags: ['autodocs'],
  argTypes: {
    oldTitle: {
      description: 'Title value',
    },
    onChange: {
      description: 'Value EditableSpan changed',
    },
  },
}
export default meta
type Story = StoryObj<typeof EditableSpan>

export const EditableSpanStory: Story = {
  args: {
    onChange: action('Value EditableSpan changed'),
  },
}
