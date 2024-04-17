import { render } from '@testing-library/react';
import TodoItem from './TodoItem';
import { Context } from '../../context';

describe('TodoItem', () => {
    let contextValue;

    beforeEach(() => {
        contextValue = {
            toggleTodo: jest.fn(),
            deleteTodo: jest.fn(),
        };
    });

    it('checked text todo', () => {
        const { getByText  } = render(
        <Context.Provider value={contextValue}>
          <TodoItem text="Test todo" id={1} completed={false} />
        </Context.Provider>
        );

        expect(getByText(/Test Todo/i)).toMatchSnapshot();
    })

    it('checkbox is clicked', () => {
        const { getByRole } = render(
        <Context.Provider value={contextValue}>
            <TodoItem text="Test Todo" id={1} completed={false} />
        </Context.Provider>
        );

        const checkbox = getByRole('checkbox');
        checkbox.click();

        expect(contextValue.toggleTodo).toHaveBeenCalledWith(1);
    });

    it('delete button', () => {
        const { getByRole } = render(
        <Context.Provider value={contextValue}>
            <TodoItem text="Test Todo" id={1} completed={false} />
        </Context.Provider>
        );

        const deleteButton = getByRole('button');
        deleteButton.click();

        expect(contextValue.deleteTodo).toHaveBeenCalledWith(1);
    });
});