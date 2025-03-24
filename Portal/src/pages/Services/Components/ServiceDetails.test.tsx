import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { ServicesResponse } from '../../../types/apiResponses';
import ServiceDetails from './ServiceDetails';

// Mock the window.location.href for phone call tests
const mockHref = vi.fn();
Object.defineProperty(window, 'location', {
  value: { href: mockHref },
  writable: true
});

// Mock service data
const mockService: ServicesResponse = {
  id: 1,
  name_en: "Sunday Mass",
  name_fr: "Messe du Dimanche",
  name_rw: "Misa yo ku Cyumweru",
  description_en: "Regular Sunday mass service with choir.",
  description_fr: "Service régulier de messe du dimanche avec chorale.",
  description_rw: "Serivisi ya Misa isanzwe yo ku Cyumweru hamwe na korali.",
  work_days: "Sunday",
  work_hours: "8:00 AM - 10:00 AM",
  contact_person_name: "Father John",
  contact_person_phone_number: "+250123456789",
  backgroundImage: {
    id: 1,
    imageUrl: "https://example.com/image.jpg",
    filename: "mass.jpg",
    isActive: true,
    created_at: new Date()
  },
  created_at: "2024-03-20T12:00:00Z",
  updated_at: "2024-03-20T12:00:00Z"
};

describe('ServiceDetails Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders service information in all languages', () => {
    render(<ServiceDetails service={mockService} />);

    // Check titles
    expect(screen.getByText('Sunday Mass')).toBeInTheDocument();
    expect(screen.getByText('Messe du Dimanche')).toBeInTheDocument();
    expect(screen.getByText('Misa yo ku Cyumweru')).toBeInTheDocument();

    // Check language headings
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('French')).toBeInTheDocument();
    expect(screen.getByText('Kinyarwanda')).toBeInTheDocument();
  });

  it('shows and hides descriptions when clicking read more/less', () => {
    render(<ServiceDetails service={mockService} />);
    
    const readMoreButton = screen.getByRole('button', { name: /read more/i });
    
    // Initially descriptions should be collapsed
    expect(screen.getByText('Regular Sunday mass service with choir.')).toBeInTheDocument();
    
    // Click read more
    fireEvent.click(readMoreButton);
    
    // Should show "Show Less" button
    const showLessButton = screen.getByRole('button', { name: /show less/i });
    expect(showLessButton).toBeInTheDocument();
    
    // Click show less
    fireEvent.click(showLessButton);
    
    // Should show "Read More" button again
    expect(screen.getByRole('button', { name: /read more/i })).toBeInTheDocument();
  });

  it('displays schedule information correctly', () => {
    render(<ServiceDetails service={mockService} />);

    expect(screen.getByText('Work Days')).toBeInTheDocument();
    expect(screen.getByText('Sunday')).toBeInTheDocument();
    expect(screen.getByText('Work Hours')).toBeInTheDocument();
    expect(screen.getByText('8:00 AM - 10:00 AM')).toBeInTheDocument();
  });

  it('displays contact information correctly', () => {
    render(<ServiceDetails service={mockService} />);

    expect(screen.getByText('Contact Person')).toBeInTheDocument();
    expect(screen.getByText('Father John')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('+250123456789')).toBeInTheDocument();
  });

  it('initiates phone call when clicking call button', () => {
    render(<ServiceDetails service={mockService} />);
    
    const callButton = screen.getByRole('button', { name: /call phone number/i });
    fireEvent.click(callButton);
    
    expect(mockHref).toHaveBeenCalledWith('tel:+250123456789');
  });

  it('shows edit button when onEdit prop is provided', () => {
    const mockOnEdit = vi.fn();
    render(<ServiceDetails service={mockService} onEdit={mockOnEdit} />);
    
    const editButton = screen.getByRole('button', { name: /edit service/i });
    expect(editButton).toBeInTheDocument();
    
    fireEvent.click(editButton);
    expect(mockOnEdit).toHaveBeenCalled();
  });

  it('does not show edit button when onEdit prop is not provided', () => {
    render(<ServiceDetails service={mockService} />);
    
    const editButton = screen.queryByRole('button', { name: /edit service/i });
    expect(editButton).not.toBeInTheDocument();
  });

  it('applies preview styling when isPreview is true', () => {
    render(<ServiceDetails service={mockService} isPreview data-testid="service-details" />);
    
    const container = screen.getByTestId('service-details');
    expect(container).toHaveStyle({ opacity: '0.7' });
  });

  it('displays background image when provided', () => {
    render(<ServiceDetails service={mockService} />);
    
    const image = screen.getByRole('img', { name: /background image for sunday mass/i });
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Sunday Mass');
  });

  it('handles service without background image', () => {
    const serviceWithoutImage = { ...mockService, backgroundImage: null };
    render(<ServiceDetails service={serviceWithoutImage} />);
    
    const image = screen.queryByRole('img');
    expect(image).not.toBeInTheDocument();
  });

  it('accepts and applies additional box props', () => {
    render(<ServiceDetails service={mockService} data-testid="service-details" marginTop="4" />);
    
    const container = screen.getByTestId('service-details');
    expect(container).toHaveStyle({ marginTop: '1rem' });
  });

  it('copies phone number when clicking copy button', async () => {
    const mockClipboard = {
      writeText: vi.fn().mockImplementation(() => Promise.resolve()),
    };
    Object.assign(navigator, {
      clipboard: mockClipboard,
    });

    render(<ServiceDetails service={mockService} />);
    
    const copyButton = screen.getByRole('button', { name: /copy phone number/i });
    fireEvent.click(copyButton);
    
    expect(screen.getByText('Phone number copied!')).toBeInTheDocument();
  });
});
