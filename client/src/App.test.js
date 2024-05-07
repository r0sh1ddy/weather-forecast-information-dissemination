import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
const handleSubmit = (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  // Perform your search logic here
  // For example, you can call an API or filter your data based on the searchTerm
};