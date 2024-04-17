import { render } from "@testing-library/react";
import App from "./App";

describe('Check if App component renders', () => {    
    it("Renders the main page", () => {
        render(<App />)
        expect(true).toBeTruthy()
    })
});
