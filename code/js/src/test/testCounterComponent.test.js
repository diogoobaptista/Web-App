import React from 'react'
import { render } from "@testing-library/react";
import HeaderCreate from '../components/HeaderCreate';


describe('my Tests', () => {

    test("render header correctly", () => {
        const { getByTestId } = render(<HeaderCreate name="My Name is Test"></HeaderCreate>);
        expect(getByTestId('header').textContent).toBe('My Name is Test')
    });

    test("render Description Paragraph correctly", () => {
        const { getByTestId } = render(<HeaderCreate description="Hi I am Description box"></HeaderCreate>);
        expect(getByTestId('description-para').textContent).toBe('Hi I am Description box')
    });

    test("render close tooltip correctly", () => {
        const { getByTestId } = render(<HeaderCreate closeRightSection=""></HeaderCreate>);
        expect(getByTestId('id')).toBeTruthy();
    });
});