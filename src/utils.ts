export const strDateAndTime = (date) => {
  const pad = (s) => (s < 10 ? "0" + s : s);
  const d = new Date(date);

  const dd = pad(d.getDate());
  const mm = pad(d.getMonth() + 1);
  const yyyy = d.getFullYear();
  const day = `${dd}/${mm}/${yyyy}`;

  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;

  return `${day} at ${time}`;
};

export interface Set {
  reps: number;
  weight: number;
  unit: string;
  rpe?: number;
}

export interface Exercice {
  notes?: string;
  sets: Set[];
  name: string;
}

export const compute1RM = (set: Set) => {
  // https://en.wikipedia.org/wiki/One-repetition_maximum#Epley_formula
  return set.weight * (1 + set.reps / 30);
};

export const getBestSet = (sets: Set[]) => {
  if (sets.length === 0) return;
  let best = sets[0];
  sets.forEach((set) => {
    if (compute1RM(set) > compute1RM(best)) {
      best = set;
    }
  });
  return best;
};

export const totalWeight = (exercices: Exercice[]) => {
  return exercices
    .map((ex) => ex.sets)
    .reduce((sets1, sets2) => sets1.concat(sets2))
    .map((set) => (set.weight ? set.reps * set.weight : 0))
    .reduce((volume1, volume2) => volume1 + volume2);
};

export const timestampToDateFormatter = (options: Intl.DateTimeFormatOptions) => {
  return (timestamp) => (timestamp.toDate() as Date).toLocaleDateString(undefined, options);
};
