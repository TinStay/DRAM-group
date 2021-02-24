import * as React from 'react'
import { render, fireEvent } from "@testing-library/react"

import { Discussions } from '../components/Discussions/Discussions'


const mockCreateItem = (Discussions.createItem = jest.fn())

test("renders the correct filter label", async () => {
    const { getByText } = render(<Discussions />)

    getByText("COVID-19");
})