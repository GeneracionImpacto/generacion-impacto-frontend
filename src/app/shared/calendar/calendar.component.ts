import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CalendarEvent {
  dateTime: string; // ISO
  title: string;
  subtitle?: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnChanges {
  @Input() events: CalendarEvent[] = [];

  current = new Date();
  weeks: Date[][] = [];
  eventsByDay = new Map<string, CalendarEvent[]>();

  ngOnChanges(): void {
    this.rebuild();
  }

  prevMonth(): void {
    this.current = new Date(this.current.getFullYear(), this.current.getMonth() - 1, 1);
    this.rebuild();
  }

  nextMonth(): void {
    this.current = new Date(this.current.getFullYear(), this.current.getMonth() + 1, 1);
    this.rebuild();
  }

  monthLabel(): string {
    return this.current.toLocaleDateString('es-PE', { month: 'long', year: 'numeric' });
  }

  dayKey(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  isCurrentMonth(d: Date): boolean {
    return d.getMonth() === this.current.getMonth();
  }

  private rebuild(): void {
    this.buildEventsIndex();
    this.buildWeeks();
  }

  private buildEventsIndex(): void {
    this.eventsByDay.clear();
    for (const e of this.events) {
      const dt = new Date(e.dateTime);
      const key = this.dayKey(dt);
      const arr = this.eventsByDay.get(key) ?? [];
      arr.push(e);
      this.eventsByDay.set(key, arr);
    }
    // sort each day by time
    for (const [k, arr] of this.eventsByDay.entries()) {
      arr.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
      this.eventsByDay.set(k, arr);
    }
  }

  private buildWeeks(): void {
    const firstOfMonth = new Date(this.current.getFullYear(), this.current.getMonth(), 1);
    const start = new Date(firstOfMonth);
    // make monday=0
    const day = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - day);

    const weeks: Date[][] = [];
    let cursor = new Date(start);
    for (let w = 0; w < 6; w++) {
      const week: Date[] = [];
      for (let d = 0; d < 7; d++) {
        week.push(new Date(cursor));
        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(week);
    }
    this.weeks = weeks;
  }
}


