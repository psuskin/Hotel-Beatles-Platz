export interface Job {
    id: string;
    title: string;
    location: string;
    salary: number;
    description: string;
    type: 'On-site' | 'Remote' | 'Hybrid';
    schedule: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary' | 'Volunteer' | 'Internship';
    experienceLevel: 'Internship' | 'Entry level' | 'Associate' | 'Mid-senior level' | 'Director' | 'Executive';
    datePosted: Date;
    aboutTheJob: string;
    responsibilities: string[];
    qualifications: string[];
    benefits: string[];
}

export const jobs: Job[] = [
    {
        id: '1',
        title: 'Front Desk Receptionist',
        location: 'Hamburg, Germany',
        salary: 32000,
        description: 'Seeking a welcoming and organized Front Desk Receptionist for our luxury hotel in Hamburg.',
        type: 'On-site',
        schedule: 'Full-time',
        experienceLevel: 'Entry level',
        datePosted: new Date('2024-09-28'),
        aboutTheJob: 'You will be the first point of contact for our guests, providing exceptional service and ensuring a smooth check-in and check-out experience.',
        responsibilities: [
            'Welcome guests warmly and manage check-in and check-out procedures',
            'Answer and manage phone inquiries professionally',
            'Coordinate with housekeeping and other departments to fulfill guest requests',
            'Handle payments, reservations, and guest accounts',
            'Provide local information and assist with guest recommendations'
        ],
        qualifications: [
            'High school diploma or equivalent',
            'Previous experience in a hospitality role is a plus',
            'Strong communication and interpersonal skills',
            'Proficiency in German and English',
            'Professional appearance and friendly demeanor'
        ],
        benefits: [
            'Competitive salary',
            'Employee discounts on hotel and restaurant services',
            'Health insurance options',
            'Training and career advancement opportunities'
        ]
    },
    {
        id: '2',
        title: 'Restaurant Server',
        location: 'Hamburg, Germany',
        salary: 25000,
        description: 'We are looking for enthusiastic and attentive servers for our upscale restaurant.',
        type: 'Remote',
        schedule: 'Part-time',
        experienceLevel: 'Entry level',
        datePosted: new Date('2024-10-25'),
        aboutTheJob: 'As a server, you will be responsible for delivering high-quality dining service to guests, creating memorable experiences through exceptional hospitality.',
        responsibilities: [
            'Greet and seat guests',
            'Take orders accurately and provide menu guidance',
            'Serve food and beverages efficiently',
            'Respond promptly to customer needs and complaints',
            'Work with the kitchen and bar to ensure smooth service'
        ],
        qualifications: [
            'Prior experience as a server or in customer service preferred',
            'Strong organizational skills and multitasking abilities',
            'Ability to work well in a fast-paced environment',
            'Proficiency in German and English',
            'Friendly, outgoing personality'
        ],
        benefits: [
            'Competitive hourly wage with tips',
            'Meal discounts',
            'Flexible scheduling options',
            'Training and development opportunities'
        ]
    },
    {
        id: '3',
        title: 'Bartender',
        location: 'Berlin, Germany',
        salary: 28000,
        description: 'We are seeking a skilled and personable bartender to join our team in Berlin.',
        type: 'On-site',
        schedule: 'Full-time',
        experienceLevel: 'Associate',
        datePosted: new Date('2024-10-25'),
        aboutTheJob: 'As our bartender, you will craft exceptional cocktails, provide great service, and ensure a welcoming atmosphere for all guests.',
        responsibilities: [
            'Prepare and serve a wide range of beverages',
            'Maintain cleanliness and organization of the bar area',
            'Monitor and restock bar inventory as needed',
            'Engage with guests to provide recommendations and take orders',
            'Enforce all health and safety regulations behind the bar'
        ],
        qualifications: [
            'Experience as a bartender or mixologist',
            'Knowledge of various cocktails and beverages',
            'Ability to work well in a team',
            'Proficiency in German and English',
            'Customer-focused attitude'
        ],
        benefits: [
            'Competitive salary and tips',
            'Flexible working hours',
            'Employee discounts on drinks and meals',
            'Training in mixology and customer service'
        ]
    }
];
