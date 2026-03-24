export interface AflMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: string;
  venue?: string;
  date?: string;
  squads?: any;
  roundCode?: string;
}
