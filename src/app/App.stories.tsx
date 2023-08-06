import type {Meta, StoryObj}   from  '@storybook/react';
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";
import App from "./App";

const  meta: Meta<  typeof  App> = {
    title:   'TODOLISTS/App',
    component:   App,
    tags: [  'autodocs'],
    decorators: [ReduxStoreProviderDecorator]
};

export default  meta;
type Story = StoryObj<  typeof  App>;
export const  AppExample: Story = {}
