import exercises from "./exercises";

export default [
  {
    id: 1,
    title: "Выход силой",
    image: "https://picsum.photos/500/500",
    duration: 40,
    places: ["Дом", "Зал"],
    muscles: ["Грудь", "Трицепс"],
    categories: ["Калистеника", "С весом"],
    styles: ["Жиросжигание"],
    isFavorite: false,
    exercises: [
      {
        level: "beginner",
        groups: [
          { name: "Разминка", items: exercises },
          { name: "Разминка #2", items: exercises },
        ],
      },
      {
        level: "intermediate",
        groups: [{ name: "Разминка", items: exercises.slice(0, 2) }],
      },
      {
        level: "advanced",
        groups: [{ name: "Разминка", items: exercises.slice(0, 1) }],
      },
    ],
  },
  {
    id: 2,
    title: "Тренировка на все тело",
    image: "https://picsum.photos/500/500",
    duration: 45,
    places: ["Дом"],
    muscles: ["Грудь"],
    categories: ["С весом"],
    styles: ["Выносливость"],
    isFavorite: false,
    isPro: true,
    exercises: [
      { level: "beginner", groups: [{ name: "Разминка", items: exercises }] },
      {
        level: "intermediate",
        groups: [{ name: "Разминка", items: exercises.slice(0, 2) }],
      },
      {
        level: "advanced",
        groups: [{ name: "Разминка", items: exercises.slice(0, 1) }],
      },
    ],
  },
  {
    id: 3,
    title: "Учимся подтягиваться",
    image: "https://picsum.photos/500/500",
    duration: 30,
    places: ["Дом", "Зал", "Парк"],
    muscles: ["Трицепс"],
    categories: ["Калистеника", "С весом"],
    styles: ["Сила"],
    isPro: true,
    isYouTube: true,
    isFavorite: true,
    exercises: [
      { level: "beginner", groups: [{ name: "Разминка", items: exercises }] },
      {
        level: "intermediate",
        groups: [{ name: "Разминка", items: exercises.slice(0, 2) }],
      },
      {
        level: "advanced",
        groups: [{ name: "Разминка", items: exercises.slice(0, 1) }],
      },
    ],
  },
];
