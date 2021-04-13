import trainings from "./trainings";

export default [
  {
    id: 1,
    title: "Тренировка на все тело",
    image: "https://picsum.photos/500/500",
    places: ["Дом"],
    muscles: ["Грудь"],
    categories: ["С весом"],
    styles: ["Выносливость"],
    isFavorite: true,
    groups: [
      {
        title: "Неделя 1",
        trainings: trainings,
      },
      {
        title: "Неделя 2",
        trainings: trainings.slice(0, 2),
      },
      {
        title: "Неделя 3",
        trainings: trainings.slice(0, 1),
      },
      {
        title: "Неделя 4",
        trainings: trainings,
      },
    ],
  },
];
