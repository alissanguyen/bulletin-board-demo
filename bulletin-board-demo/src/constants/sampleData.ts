import * as faker from "faker";

export const categories = [
  { value: "School", label: "School" },
  {
    value: "Work",
    label: "Work",
  },
  {
    value: "Health",
    label: "Health",
  },
  {
    value: "Others",
    label: "Others",
  },
  { value: "Grocery", label: "Grocery" },
  { value: "Shopping", label: "Shopping" },
];

export const samplePostIts1: PostItNoteData[] = Array.from(
  Array(20).keys()
).map((): PostItNoteData => {
  return {
    id: faker.datatype.uuid(),
    createdAtMillis: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ),
    description: faker.lorem.paragraph(),
    isCompleted: false,
    title: faker.hacker.phrase(),
    category: faker.commerce.department(),
  };
});

export const samplePostIts2: PostItNoteData[] = [
  {
    id: faker.datatype.uuid(),
    createdAtMillis: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ),
    description: "Go to Target to get milk",
    isCompleted: false,
    title: "Get milk",
    category: "Grocery",
  },
  {
    id: faker.datatype.uuid(),
    createdAtMillis: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ),
    description: "Do midterm test before 9/20",
    isCompleted: false,
    title: "Midterm for MATH 112",
    category: "School",
  },
  {
    id: faker.datatype.uuid(),
    createdAtMillis: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ),
    description: "Make a list of posts for clients on Instagram",
    isCompleted: false,
    title: "Media Management",
    category: "Work",
  },
  {
    id: faker.datatype.uuid(),
    createdAtMillis: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ),
    description: "Go to the gym at 7Pm with Carla",
    isCompleted: false,
    title: "Gym",
    category: "Health",
  },
  {
    id: faker.datatype.uuid(),
    createdAtMillis: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ),
    description:
      "Make a new app with drag and drop post-its, random background color",
    isCompleted: true,
    title: "New programming idea",
    category: "School",
  },
  {
    id: faker.datatype.uuid(),
    createdAtMillis: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ),
    description: "Fix the ceiling light, call maintenance for bathtub",
    isCompleted: false,
    title: "Apartment maintenace",
    category: "Others",
  },
  {
    id: faker.datatype.uuid(),
    createdAtMillis: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ),
    description: "Bring car to dealer for oil and brake change",
    isCompleted: false,
    title: "Car maintenance",
    category: "Others",
  },
  {
    id: faker.datatype.uuid(),
    createdAtMillis: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ),
    description: "Draw 2 paintings for art class, one oil and one watercolor",
    isCompleted: true,
    title: "Paintings for ART 120",
    category: "School",
  },
  {
    id: faker.datatype.uuid(),
    createdAtMillis: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ),
    description: "Get some new leggings at Lululemon",
    isCompleted: false,
    title: "Gym clothes",
    category: "Shopping",
  },
  {
    id: faker.datatype.uuid(),
    createdAtMillis: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ),
    description: "Get moisturizer from Sephora at West Lake Center",
    isCompleted: false,
    title: "Sephora run",
    category: "Shopping",
  },
  {
    id: faker.datatype.uuid(),
    createdAtMillis: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ),
    description:
      "Get mom veggie snacks and chocolate (milk chocolate, not dark chocolate)",
    isCompleted: true,
    title: "Mom's snacks and chocolate",
    category: "Grocery",
  },
  {
    id: faker.datatype.uuid(),
    createdAtMillis: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ),
    description: "Buy colognes for dad",
    isCompleted: false,
    title: "Father's Day",
    category: "Shopping",
  },
  {
    id: faker.datatype.uuid(),
    createdAtMillis: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ),
    description: "Feed the cats with the new diet, replace their fountains",
    isCompleted: false,
    title: "Kitty care",
    category: "Others",
  },
  {
    id: faker.datatype.uuid(),
    createdAtMillis: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ),
    description: "Checking in with Mikayla about the project for ECON 240",
    isCompleted: true,
    title: "ECON 240 Project",
    category: "School",
  },
];
