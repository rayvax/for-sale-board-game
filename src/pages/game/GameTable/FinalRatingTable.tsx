import { FinalRating } from '../../../models/game';

interface FinalRatingTableProps {
  finalRatings: FinalRating[];
}

export function FinalRatingTable({ finalRatings }: FinalRatingTableProps) {
  return (
    <table>
      <thead>
        <th>
          <td>Nickname</td>
          <td>Score</td>
        </th>
      </thead>
      <tbody>
        {finalRatings.map((rating, i) => (
          <tr key={`${rating.nickaname}-${i}`}>
            <td>{rating.nickaname}</td>
            <td>{rating.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
