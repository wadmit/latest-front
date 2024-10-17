const QualificationStatuses: {
  id: number;
  text: string;
  type: "positive" | "negative";
}[] = [
  { id: 1, text: "You are qualified for Admission", type: "positive" },
  { id: 2, text: "Pre-qualified for partial scholarship", type: "positive" },
  { id: 3, text: "You may qualify for partial scholarship", type: "positive" },
  { id: 4, text: "Not qualified for admission", type: "negative" },
  { id: 5, text: "Not qualified for partial scholarship", type: "negative" },
  { id: 6, text: "1st year full tuition fee waiver", type: "positive" },
];

export function filterStatus(score: number) {
  if (score < 35) {
    return QualificationStatuses.filter((q) => q.id === 4 || q.id === 5);
  }
  if (score > 34 && score < 50) {
    return QualificationStatuses.filter((q) => q.id === 1 || q.id === 3);
  }
  if (score > 49 && score < 75) {
    return QualificationStatuses.filter((q) => q.id === 1 || q.id === 2);
  }
  return QualificationStatuses.filter((q) => q.id === 1 || q.id === 6);
}
