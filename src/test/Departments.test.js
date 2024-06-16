import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Departments from '../routes/Departments.js';
import { useNavigate } from 'react-router-dom';
import { useDepartments } from '../hooks/department/useDepartments.js';
import { useAddDepartment } from '../hooks/department/useAddDepartment.js';
import { useEditDepartment } from '../hooks/department/useEditDepartment.js';
import { useDeleteDepartment } from '../hooks/department/useDeleteDepartment.js';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('../hooks/department/useDepartments.js');
jest.mock('../hooks/department/useAddDepartment.js');
jest.mock('../hooks/department/useEditDepartment.js');
jest.mock('../hooks/department/useDeleteDepartment.js');

const mockNavigate = useNavigate;
const mockUseDepartments = useDepartments;
const mockUseAddDepartment = useAddDepartment;
const mockUseEditDepartment = useEditDepartment;
const mockUseDeleteDepartment = useDeleteDepartment;

describe('Departments Component', () => {
    beforeEach(() => {
        mockUseDepartments.mockReturnValue([]);
        mockUseAddDepartment.mockReturnValue(jest.fn());
        mockUseEditDepartment.mockReturnValue(jest.fn());
        mockUseDeleteDepartment.mockReturnValue(jest.fn());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('can add a new department', async () => {
        const addDepartment = jest.fn();
        mockUseAddDepartment.mockReturnValue(addDepartment);

        render(<Departments />);
        const input = screen.getByPlaceholderText('Enter department name');
        const button = screen.getByText('ADD');

        fireEvent.change(input, { target: { value: 'New Department' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(addDepartment).toHaveBeenCalledWith({ name: 'New Department' }, expect.any(Function));
        });
    });

    test('can edit a department', async () => {
        const departments = [
            { id: 1, name: 'Department 1' },
            { id: 2, name: 'Department 2' },
        ];
        mockUseDepartments.mockReturnValue(departments);
        const editDepartment = jest.fn();
        mockUseEditDepartment.mockReturnValue(editDepartment);

        render(<Departments />);
        const select = screen.getAllByDisplayValue('Department 1')[0];
        const input = screen.getByPlaceholderText('Enter new department name');
        const button = screen.getByText('EDIT');

        fireEvent.change(select, { target: { value: 1 } });
        fireEvent.change(input, { target: { value: 'Updated Department' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(editDepartment).toHaveBeenCalledWith("1", { name: 'Updated Department' }, expect.any(Function));
        });
    });

    test('can delete a department', async () => {
        const departments = [
            { id: 1, name: 'Department 1' },
            { id: 2, name: 'Department 2' },
        ];
        mockUseDepartments.mockReturnValue(departments);
        const deleteDepartment = jest.fn();
        mockUseDeleteDepartment.mockReturnValue(deleteDepartment);

        render(<Departments />);
        const deleteButton = screen.getAllByTestId('delete-button')[0];

        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(deleteDepartment).toHaveBeenCalledWith(1, expect.any(Function));
        });
    });
});
