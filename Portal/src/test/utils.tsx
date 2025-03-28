import { ChakraProvider } from '@chakra-ui/react';
import { render as rtlRender, RenderOptions, screen, fireEvent, waitFor } from '@testing-library/react';
import { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';

const TestWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <ChakraProvider>{children}</ChakraProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => rtlRender(ui, { wrapper: TestWrapper, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render, screen, fireEvent, waitFor, userEvent };
