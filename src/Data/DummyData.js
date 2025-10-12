export const animalsData = [
  {
    id: 1,
    name: 'Bessie',
    type: 'Cow',
    breed: 'Holstein',
    age: 3,
    weight: 650,
    healthStatus: 'Healthy',
    dateAdded: '2024-01-15',
    lastVaccination: '2024-06-01'
  },
  {
    id: 2,
    name: 'Daisy',
    type: 'Cow',
    breed: 'Jersey',
    age: 2,
    weight: 450,
    healthStatus: 'Healthy',
    dateAdded: '2024-02-20',
    lastVaccination: '2024-06-15'
  },
  {
    id: 3,
    name: 'Porky',
    type: 'Pig',
    breed: 'Yorkshire',
    age: 1,
    weight: 200,
    healthStatus: 'Sick',
    dateAdded: '2024-03-10',
    lastVaccination: '2024-05-20'
  },
  {
    id: 4,
    name: 'Wooly',
    type: 'Sheep',
    breed: 'Merino',
    age: 2,
    weight: 120,
    healthStatus: 'Healthy',
    dateAdded: '2024-01-30',
    lastVaccination: '2024-06-10'
  }
];

export const financesData = [
  {
    id: 1,
    type: 'Food',
    description: 'Animal Feed - July',
    amount: 1200.00,
    date: '2024-07-01',
    category: 'FOOD'
  },
  {
    id: 2,
    type: 'Vaccine',
    description: 'Vaccination Supplies',
    amount: 350.50,
    date: '2024-07-05',
    category: 'MEDICAL'
  },
  {
    id: 3,
    type: 'Purchase',
    description: 'New Cattle Purchase',
    amount: 2500.00,
    date: '2024-07-10',
    category: 'PURCHASE'
  },
  {
    id: 4,
    type: 'Equipment',
    description: 'Fencing Materials',
    amount: 800.75,
    date: '2024-07-12',
    category: 'EQUIPMENT'
  },
  {
    id: 5,
    type: 'Food',
    description: 'Supplement Feed',
    amount: 450.25,
    date: '2024-07-18',
    category: 'FOOD'
  }
];

export const animalTypes = ['Cow', 'Pig', 'Sheep', 'Goat', 'Chicken', 'Horse'];
export const healthStatuses = ['Healthy', 'Sick', 'Injured', 'Recovering'];
export const financeCategories = [
  { value: 'FOOD', label: 'Food & Feed' },
  { value: 'MEDICAL', label: 'Medical & Vaccines' },
  { value: 'PURCHASE', label: 'Animal Purchase' },
  { value: 'EQUIPMENT', label: 'Equipment' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'OTHER', label: 'Other' }
];
